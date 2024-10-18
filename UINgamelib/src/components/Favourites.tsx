import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GameGrid from './GameGrid';
import sanityClient from '../UINgamelib/sanityClient';

interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string | null;
  genres: { name: string }[];
}

const Favourites: React.FC = () => {
  const { user } = useAuth(); 
  const [favourites, setFavourites] = useState<Game[]>([]); 
  const [favouriteCount, setFavouriteCount] = useState<number>(0); 
  const [error, setError] = useState<string | null>(null);

 
  const fetchFavourites = async () => {
    if (!user) return; 
    try {
      const query = `*[_type == "user" && _id == $userId]{
        "favourites": favourites[]->{
          rawgid
        },
        "favouriteCount": count(favourites)
      }[0]`;

      const result = await sanityClient.fetch(query, { userId: user._id });

      if (result?.favourites) {
        setFavouriteCount(result.favouriteCount);
        const rawgids = result.favourites.map((fav: any) => fav.rawgid);      
        const limitedRawgids = rawgids.slice(0, 20);
        

        const detailedGames = await Promise.all(
          limitedRawgids.map(async (rawgid: string) => {
            const response = await fetch(`https://api.rawg.io/api/games/${rawgid}?key=ae235fe3f8284756b1404213bcb1ea0b`);
            const gameData = await response.json();
            return gameData;
          })
        );
        setFavourites(detailedGames);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavourites();
    }
  }, [user]);

  return (
    <div className="search-container">
      <h1>My Favourite Games:</h1>

      {error && <p>{error}</p>}

      <div className="game-results-grid">
        <p>Total Games: {favouriteCount}</p>
        {favourites.length > 0 ? (
          <GameGrid games={favourites} />
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;

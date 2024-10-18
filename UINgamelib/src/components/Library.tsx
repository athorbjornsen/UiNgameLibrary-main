import { useEffect, useState } from 'react';
import sanityClient from '../UINgamelib/sanityClient';
import GameGrid from './GameGrid';
import { useAuth } from '../context/AuthContext';

interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string | null;
  genres: { name: string }[];
}

const Library: React.FC = () => {
  const { user } = useAuth(); 
  const [libraryGames, setLibraryGames] = useState<Game[]>([]);
  const [libraryCount, setLibraryCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchLibraryGames = async () => {
    if (!user) return;
    try {
      const query = `*[_type == "user" && _id == $userId]{
        "library": library[]->{
          rawgid
        },
        "libraryCount": count(library)
      }[0]`;

      const result = await sanityClient.fetch(query, { userId: user._id });

      if (result?.library) {
        const rawgids = result.library.map((lib: any) => lib.rawgid);
        setLibraryCount(result.libraryCount);
        const limitedRawgids = rawgids.slice(0, 40); //need to limit responses this is the 3rd. account 

        const detailedGames = await Promise.all(
          limitedRawgids.map(async (rawgid: string) => {
            const response = await fetch(`https://api.rawg.io/api/games/${rawgid}?key=ae235fe3f8284756b1404213bcb1ea0b`);
            const gameData = await response.json();
            return gameData;
          })
        );
        setLibraryGames(detailedGames);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLibraryGames();
    }
  }, [user]);

  return (
    <div className="search-container">
      <h1>My Library:</h1>

      {error && <p>{error}</p>}

      <div className="game-results-grid">        

        
        Total Games: {libraryCount}
        {libraryGames.length > 0 ? (
          <GameGrid games={libraryGames} />
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  );
};

export default Library;


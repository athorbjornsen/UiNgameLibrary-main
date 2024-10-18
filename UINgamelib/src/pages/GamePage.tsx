import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
//import '../App.css';
//import '../pages/styles/GamePageCss.css';
import sanityClient from '../UINgamelib/sanityClient';
import { v4 as uuidv4 } from 'uuid';


interface GameDetailsProps {
  id: number;
  name: string;
  description: string;
  metacritic: number;
  released: string;
  background_image: string;
  website: string;
  genres: { name: string }[];
  publishers: { name: string }[];
  platforms: { platform: { name: string } }[];
}

//strip to now show html tags 
const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};


const GameDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); 
  const [gameDetails, setGameDetails] = useState<GameDetailsProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); 
  const [sanityGameId, setSanityGameId] = useState<string | null>(null); 

  const { user } = useAuth(); 


  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${slug}?key=ae235fe3f8284756b1404213bcb1ea0b`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }

        const data = await response.json();
        setGameDetails(data);
      } catch (error: any) {
        console.error('Error fetching game details:', error);
        setError(error.message);
      }
    };

    fetchGameDetails();
  }, [slug]);

  const saveGameToSanity = async () => {
    if (!gameDetails) return;

    setIsAdding(true); //  loading state
    try {
      //  if exist
      const existingGameQuery = `*[_type == "game" && rawgid == $rawgid][0]`;
      const existingGame = await sanityClient.fetch(existingGameQuery, { rawgid: gameDetails.id });

      if (!existingGame) {
        // if not create the document 
        const newGame = await sanityClient.create({
          _type: 'game',
          title: gameDetails.name,
          rawgid: gameDetails.id.toString(),
          releaseyear: parseInt(gameDetails.released.split('-')[0]),
          genre: gameDetails.genres.map((genre) => genre.name).join(', '),
        });
        setSanityGameId(newGame._id); // store new game id
      } else {
        setSanityGameId(existingGame._id); // store existing id testing 
       
      }
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game to Sanity.");
    } finally {
      setIsAdding(false); // stop loading
    }
  };

  //d
  const handleAddToList = async (listType: 'favourites' | 'library') => {
    if (!user || !sanityGameId) {
      alert("Are you logged in? Is the game added to Sanity?.");
      return;
    }



    try {
      await sanityClient
        .patch(user._id)
        .setIfMissing({ [listType]: [] })
        .insert('after', `${listType}[-1]`, [{
          _type: 'reference',
          _ref: sanityGameId,
          _key: uuidv4(), // hmm generate a unique key for each item with uuidv. m
        }])
        .commit();

      alert(`Game has been added to your ${listType}.`);
    } catch (error) {
      console.error(`Error adding game to ${listType}:`, error);
      alert(`Failed to add game to ${listType}.`);
    }
  };

  const handleAddToFavorites = async () => {
    await handleAddToList('favourites');
  };

  const handleAddToLibrary = async () => {
    await handleAddToList('library');
  };

  

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!gameDetails) {
    return <p>Loading game details...</p>;
  }

  return (
    
    <div className="game-details">
  <h1 className="game-title">{gameDetails.name}</h1>
  
  <div className="game-details-content">
    <img src={gameDetails.background_image} alt={gameDetails.name} className="game-image" />
    <div className="game-description-container">
      <p className="game-description"><strong>Description:</strong>{gameDetails.description ? stripHtmlTags(gameDetails.description) : 'Description not available.'}</p>
      <p><strong>Release Date:</strong> {gameDetails.released}</p>
      <p><strong>Metacritic Score:</strong> {gameDetails.metacritic || 'Score not available'}</p>
      <p><strong>Platforms:</strong> {gameDetails.platforms.map((platform) => platform.platform.name).join(', ')}</p>
      <p><strong>Genres:</strong> {gameDetails.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  </div>
  <div className="game-buttons">
    <button onClick={saveGameToSanity} className="save-game-button" disabled={isAdding || sanityGameId !== null}>
      {isAdding ? 'Saving...' : sanityGameId ? 'Game Saved' : 'Save Game to Sanity'}
    </button>
    <button onClick={handleAddToFavorites} className="save-game-button" disabled={!sanityGameId}>
      Add to Favourites
    </button>
    <button onClick={handleAddToLibrary} className="save-game-button" disabled={!sanityGameId}>
      Add to Library
    </button>
  </div>
  
  
</div>
  );
};

export default GameDetails;
import React from 'react';
import GameCard from './GameCard'; 
import { Link } from 'react-router-dom';


interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string | null;
  genres: { name: string }[];  
}
//const response = await fetch(`https://api.rawg.io/api/games/${rawgid}?key=6a75e8e252c242ebb5f15818794e2c56&page_size=20`);                 ae235fe3f8284756b1404213bcb1ea0b

interface GameGridProps {
  games: Game[];  
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="game-results">
      {games.length > 0 ? (
        games.map((game) => (
          <Link key={game.id} to={`/game/${game.slug}`}>
            <GameCard
              title={game.name}
              image={game.background_image}
              releaseYear={game.released || 'Unknown'}
              genre={game.genres.map((g) => g.name).join(', ')}
              
            />
          </Link>
        ))
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
};

export default GameGrid;
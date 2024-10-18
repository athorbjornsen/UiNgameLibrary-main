//import '../App.css';
import React from 'react';

export interface GameCardProps {
  title: string;
  image: string;
  releaseYear: string;
  genre: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, releaseYear, genre }) => {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-card__image" />
      <div className="game-card__info">
        <h2 className="game-card__title">{title}</h2>
        <h5 className="game-card__genre">{genre}</h5>
        <p className="game-card__release-year">{releaseYear}</p>
      
      </div>
    </div>
  );
};

export default GameCard;


import React, { useState, useEffect } from 'react';
import GameGrid from '../components/GameGrid'; 

// todo genres
const genreOptions = [
  { name: 'Action', slug: 'action' },
  { name: 'Adventure', slug: 'adventure' },
  { name: 'RPG', slug: 'rpg' },
  { name: 'Strategy', slug: 'strategy' },
  { name: 'Shooter', slug: 'shooter' },
  { name: 'Puzzle', slug: 'puzzle' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Fighting', slug: 'fighting' },
  { name: 'Racing', slug: 'racing' },
  { name: 'Simulation', slug: 'simulation' },
  { name: 'Indie', slug: 'indie' },
  { name: 'Platformer', slug: 'platformer' },
  { name: 'Card', slug: 'card' },
  { name: 'Family', slug: 'family' },
  { name: 'Massively Multiplayer', slug: 'massively-multiplayer' },
  { name: 'Educational', slug: 'educational' },
  { name: 'Casual', slug: 'casual' },
  { name: 'Arcade', slug: 'arcade' },
  { name: 'Board Games', slug: 'board-games' },
  
];

interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string | null;
  genres: { name: string }[];
}

const SearchGames: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenreChange = (slug: string) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(slug)
        ? prevSelectedGenres.filter((genre) => genre !== slug)
        : [...prevSelectedGenres, slug]
    );
  };

  const fetchGames = async () => {
    setError(null);
    try {
      let query = `https://api.rawg.io/api/games?key=ae235fe3f8284756b1404213bcb1ea0b&page_size=20`;

      if (searchTerm) {
        query += `&search=${searchTerm}`;
      }

      if (selectedGenres.length > 0) {
        query += `&genres=${selectedGenres.join(',')}`;
      }

      if (startYear && endYear) {
        query += `&dates=${startYear}-01-01,${endYear}-12-31`;
      }

      const response = await fetch(query);
      if (!response.ok) {
        throw new Error('Failed to fetch games from the RAWG API');
      }

      const data = await response.json();
      setGames(data.results || []);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [searchTerm, selectedGenres, startYear, endYear]);

  return (
    <div className="search-container">
      <div className="search-games">
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchGames}>Search</button>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="search-content">
        <div className="filter-box">
          <h3>Filter Games</h3>
          <h4>Genres</h4>
          {genreOptions.map((genre) => (
            <label key={genre.slug}>
              <input
                type="checkbox"
                value={genre.slug}
                checked={selectedGenres.includes(genre.slug)}
                onChange={() => handleGenreChange(genre.slug)}
              />
              {genre.name}
            </label>
          ))}

          <h4>From Year:</h4>         
          <input
            type="text"
            placeholder="e.g. 1992"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
          />
          <h4>To Year:</h4>
          <input
            type="text"
            placeholder="e.g. 2011"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
          />
        </div>

       
        <div className="game-results-grid">
          {games.length > 0 ? (
            <GameGrid games={games} />
          ) : (
            <p>No games found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchGames;

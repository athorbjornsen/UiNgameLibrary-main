
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
//import FavouriteGames from './pages/FavouriteGames';
import SearchGames from './pages/searchGames';
import './App.css';
import GamePage from './pages/GamePage';

import Favourites from './components/Favourites';
import Library from './components/Library';



const App = () => {
  return (
    <Router>
      <div className="AppBox">
        <>
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/searchGames">Search</Link></li>
              <li><Link to="/favourites">My Favourites</Link></li>
              <li><Link to="/library">My Library</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>  

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/searchgames" element={<SearchGames />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/library" element={<Library/>} />
            <Route path="/game/:slug" element={<GamePage />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </>
      </div>
    </Router>
  );
};

export default App;



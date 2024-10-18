import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Favourites from '../components/Favourites';
import Library from '../components/Library';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();


  if (!user) {
    navigate('/login');
    return null; 
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>

      <div className="dashboard-sections">      

        <section className="favourites-section">          
          <Favourites />
        </section>
       
        <section className="library-section">          
          <Library />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

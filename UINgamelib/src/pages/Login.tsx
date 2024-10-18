import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { ImportMetaEnv } from '../vite-env';
import { useAuth } from '../context/AuthContext';



// fix localhost bugging when not logging out properly. also the css..

const Login: React.FC = () => {
  const { users, login } = useAuth();
  const [selectedUsername, setSelectedUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.username === selectedUsername);
    if (user) {
      login(user);
      alert('Logged in!')
      navigate('/dashboard');
      
    } else {
      alert('User not found');
    }
  };

  return (
    <div className="game-details">
      <h2>Login</h2>
      <p><h3>Valid usernames </h3>
        Per , Ola , Kari , Helt-Tom , Based
      </p>
      <input
        type="text"
        placeholder="Enter username"
        value={selectedUsername}
        onChange={(e) => setSelectedUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
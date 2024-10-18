import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import sanityClient from '../UINgamelib/sanityClient';


interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  users: User[];
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Need AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const query = '*[_type == "user"]';
      const sanityUsers: User[] = await sanityClient.fetch(query);
      console.log('Fetched users:', sanityUsers);
      setUsers(sanityUsers);
    };

    fetchUsers();

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (selectedUser: User) => {
    localStorage.setItem('user', JSON.stringify(selectedUser));
    setUser(selectedUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

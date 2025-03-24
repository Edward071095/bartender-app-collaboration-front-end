import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUserFromToken());
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
    window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};



export { UserProvider, UserContext };

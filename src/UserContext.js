import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [lines, setLines] = useState(null);

  const setUserDataContext = (data) => {
    setUserData(data);
  };

  const setNumberOfLines = (data) => {
    setLines(data);
  };

  return (
    <UserContext.Provider value={{ userData, setUserDataContext, lines, setNumberOfLines }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

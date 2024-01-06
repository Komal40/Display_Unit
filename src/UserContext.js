import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [lines, setLines] = useState(0);
  const [lineStation, setLineStation]= useState([]);
  const [lineNum, setLineNum]=useState(0);
  const [portNum, setPortNum]=useState([]);
  const [portLength, SetPortLength]=useState(0)

  const setUserDataContext = (data) => {
    setUserData(data);
  };

  const setNumberOfLines = (data) => {
    setLines(data);
  };

  const setNumberLineStations=(data)=>{
    setLineStation(data)
  }

  const setLineNumber=(data)=>{
    setLineNum(data)
  }

  const setPortNumber=(data)=>{
    setPortNum(data)
  }

  const setPortNumLength=(data)=>{
    SetPortLength(data)
  }


  return (
    <UserContext.Provider value={{ userData, setUserDataContext, lines, setNumberOfLines, lineStation, setNumberLineStations,
    lineNum, setLineNumber , portNum, setPortNumber, portLength, setPortNumLength}}>
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

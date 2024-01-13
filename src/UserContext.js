import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [lines, setLines] = useState(0);
  const [lineStation, setLineStation]= useState([]);
  const [lineNum, setLineNum]=useState(0);
  const [portNum, setPortNum]=useState([]);
  const [portLength, SetPortLength]=useState(0);
  const [processData, setProcessData]=useState([])
  
  const [stationLine, setStationLine]=useState(0)
  const [stationId, setStationId]=useState('')

  const particularStationId=(data)=>{
    setStationId(data)
  }

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


  const setProcessDataFun=(data)=>{
    setProcessData(data)
  }

  const stationOnLine=(data)=>{
    setStationLine(stationLine)
  }


  return (
    <UserContext.Provider value={{ userData, setUserDataContext, lines, setNumberOfLines, lineStation, setNumberLineStations,
    lineNum, setLineNumber , portNum, setPortNumber, portLength, setPortNumLength, setProcessDataFun, processData,
    stationLine, stationOnLine, particularStationId, stationId}}>
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

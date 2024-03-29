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

  const [LoginProcess, setLoginProcess]=useState([])

  // pass ,fail, totalstations
  const [passVal, setPassVal]=useState(0)
  const [failVal, setFailVal]=useState(0)
  const [totalStations, setTotalStations]=useState(0)
  const [activeStations, setActiveStations]=useState(0)

  const getTotalStations=(data)=>{
    setTotalStations(data)
  }
  const getFailVal=(data)=>{
    setFailVal(data)
  }
  const getPassVal=(data)=>{
    setPassVal(data)
  }
  const getActiveStations=(data)=>{
    setActiveStations(data)
  }


  const particularStationId=(data)=>{
    setStationId(data)
  }

  const setUserDataContext = (data) => {
    setUserData(data);
  };

  const setNumberOfLines = (data) => {
    setLines(data);
    localStorage.setItem("lines",data)
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
    setStationLine(data)
  }

const getLoginProcessFunction=(data)=>{
  setLoginProcess(data)
}



  return (
    <UserContext.Provider value={{ userData, setUserDataContext, lines, setNumberOfLines, lineStation, setNumberLineStations,
    lineNum, setLineNumber , portNum, setPortNumber, portLength, setPortNumLength, setProcessDataFun, processData,
    stationLine, stationOnLine, particularStationId, stationId, LoginProcess, getLoginProcessFunction,
    getTotalStations, totalStations, getFailVal, failVal, getPassVal, passVal, getActiveStations, activeStations
    }}>
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




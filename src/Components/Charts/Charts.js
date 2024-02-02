import React from 'react'
import './Charts.css'
import Navbar from '../Navbar/Navbar'


export default function Charts() {

  useEffect(() => {
    const fetchData = async () => {
      const link = process.env.REACT_APP_BASE_URL;
      console.log("Base URL:", link);
      const endPoint = "/work/getoperator";
      const fullLink = link + endPoint;

      try {
        const params = new URLSearchParams();
        params.append("month", "01");
        params.append("date", "05");

        const response = await fetch(fullLink, {
          method: "POST",
          body: params,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(day,month)
          console.log("process data", data.processdata);
          console.log("Process data is array", Array.isArray(data.processdata));
          setProcessDataFun(data.processdata);
          setProcessData(data.processdata);
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
        }
      } catch (error) {
        console.error("Error galt id:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div>
      <Navbar/>
    </div>

    <div className='charts_main'>
        <h2>charts</h2>
    </div>
    </>
  )
}

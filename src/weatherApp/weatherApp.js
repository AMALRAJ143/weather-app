import './weatherApp.css'
import axios from "axios";
import { useEffect, useState } from "react";
import bg from "./whetherBg.mp4"

function WeatherApp() {
  const [cityName, setCName] = useState("");
  const [speed, setSpeed] = useState('');//
  const [temperature, setTemperature] = useState('');//
  const [display, setDisplay] = useState(false)
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[new Date().getDay()];
  const month = months[new Date().getMonth()];
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [])
  function getCurrentTime() {
    const date = new Date();
    return `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds()}`;
  }

  const getWeather = async () => {
    try{
      const apiKey = "48d97e449f135a52c9446aa856176636";
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
      const res = await axios.get(api);
      console.log(res.data)
      setSpeed(res.data.wind.speed)
      setTemperature(res.data.main.temp)
      setDisplay(true)
    }
    catch(error){
      alert("Please Enter a City Name")
    }
  }

  return (
    <>
    <video src={bg} autoPlay muted loop id='bg1'/>
    <div id='wholeContainer'>
    {
      display===true?(
        <>
        <video src={bg} autoPlay muted loop id='bg2'/>
        <div id='contentDiv'>
          <div className='opacity'></div>
        <div id='copyright'>
        @Amalraj
        </div>
          <h1 id='report'>Weather Report</h1>
          <div id='day'>
          <h3 >{day}</h3>
        </div>
        <div className='time1'>
          <span >{month}/{date}/{year}</span>
        </div>
        <div className='time2'>
          <span>{currentTime}</span>

        </div>
          <h2 className='cityName'>{cityName.toUpperCase()}</h2>
          <div className='content'>Wind Speed :{speed}kmph </div>
          <div className='content'>Temperature : {temperature}</div>
          <i class="fa fa-arrow-circle-left" id='icon' aria-hidden="true" onClick={()=>{setDisplay(false)}}></i>
        </div>
      </>
      ):(
        <div id='weatherInput'>
        <div className='opacity'></div>
        <div className='heading'>
          <h1 >Weather App</h1>
        </div>
        <div className='inputt' >
          <input id='inputt' type="text" placeholder="Search City Name" value={cityName} onChange={(e) => setCName(e.target.value)} />
          <button onClick={getWeather} id='buttonn' ><i class="fa-solid fa-magnifying-glass"></i></button>
          
          <div className='logo'>
          <i class="fa-solid fa-earth-americas"></i>
          </div>
          <div className='time1'>
          <span >{month}/{date}/{year}</span>
        </div>
        </div>
        <div id='copyright'>
        @Amalraj
        </div>
      </div>
      
      )
    }
    
    </div>
           
    </>
  )
}

export default WeatherApp;


import TopButtons from "../components/TopButton";
import Inputs from '../components/inputs';
import TimeAndLocation from '../components/TimeAndLocation';
import TemperatureAndDetails from '../components/TemperatureAndDetails';
import Forecast from '../components/Forecast';
import getFormattedWeatherData from '../services/weatherServices';
import React, { useEffect,useState } from 'react';

function WeatherScreen() {

  const[query,setQuery]=useState({q:"colombo"});
  const[units,setUnits]=useState("metric");
  const[weather,setWeather]=useState(null);


useEffect(()=>{
  const fetchWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };

  fetchWeather();
},
[query,units]);

return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-300 to-blue-700 h-fit shadow-xl shadow-gray-400 mb-5">
      <TopButtons/>
      <Inputs/>
{weather && (
  <div>
      <TimeAndLocation weather={weather}/>
      <TemperatureAndDetails weather={weather}/>
      <Forecast title="daily forecast" items={weather.daily}/>
      </div>
    
    
  )}
  </div>
  );
}

export default WeatherScreen;
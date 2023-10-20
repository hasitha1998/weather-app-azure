import { DateTime } from "luxon";

const API_KEY = "2c013ce3ac7a2244704120aa112063ba"
const BASE_URL = "https://api.openweathermap.org/data/2.5"




const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle the error here
    }
  };
    const formatCurrentWeather = (data)=>{
        const {
            coord:{lat, lon},
            main:{temp,feels_like,temp_min,temp_max,humidity},
            name,
            dt,
            sys:{country, sunrise, sunset},
            weather,
            wind:{speed}
        }=data
        const {main: details,icon}=weather[0]
        return{lat,
            lon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            humidity,
            name,
            dt,
            country,
            sunrise,
            sunset,
            details,
            icon,
            speed};
    };

    const formatForecastWeather = async (data) => {
        const { timezone, daily } = data;
      
        daily?.slice(1, 6).map((d) => {
          return {
            title: formatLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
          };
        });
      
        return { timezone, daily };
      };
   
    

    
      const getFormattedWeatherData = async (searchParams) => {
        try {
          const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);
      
          const { lat, lon } = formattedCurrentWeather;
      
          const formattedForecastWeather = await getWeatherData("onecall", {
            lat,
            lon,
            exclude: "current,minutely,alerts",
            units: searchParams.units,
          }).then(formatForecastWeather);
      
          return { ...formattedCurrentWeather, ...formattedForecastWeather };
        } catch (error) {
          console.log(error);
          // Handle the error here
        }
      };
      
      

 const formatLocalTime=(secs, zone, format="cccc, dd LLL yyyy' | Local time: 'hh:mm a"
 ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

 const iconUrlFromCode = (code)=> `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {formatLocalTime, iconUrlFromCode};
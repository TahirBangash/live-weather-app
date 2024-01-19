import './App.css';
import React, { useState, useEffect } from 'react';
import {destination} from './images'
import MenuBar from './components/MenuBar'
import TimeContainer from './components/TimeContainer';
import WeatherStats from './components/WeatherStats';
import WeekForcast from './components/WeekForcast';
import HourlyForecast from './components/HourlyForcast';
import Footer from './components/Footer';
import axios from 'axios';




function App() {

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setLoading(false); 
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false); 
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (lat && lon) {
      setCity(`${lat},${lon}`);
    }
  }, [lat, lon]);

  const [currTemp, setCurrTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);

  const [sunRise, setSunRise] = useState([]);
  const [sunSet, setSunSet] = useState([]);

  const [conditionText, setConditionText] = useState('');
  const [conditionIcon, setConditionIcon] = useState('');

  const [humidity, setHumidity] = useState(null);
  const [currWind, setCurrWind] = useState(null);
  const [pressure, setPressure] = useState([]);
  const [UV, setUV] = useState([]);

  const [dailyForecast, setDailyForecast] = useState([]);

  const [city, setCity] = useState(`${lat},${lon}`);
  const [displayName, setDisplayName]=useState('');

  const [localDate, setLocalDate] = useState(null);

  const [nextHours, setNextHours] = useState([]);

  useEffect(() => {


    const sunTimes =      `https://api.weatherapi.com/v1/astronomy.json?${destination}&q=${city}`;
    const currentStats =  `https://api.weatherapi.com/v1/current.json?${destination}&q=${city}`;
    const hourForecast =  `https://api.weatherapi.com/v1/forecast.json?${destination}&q=${city}&days=2`;
    const daysForecast =  `https://api.weatherapi.com/v1/forecast.json?${destination}&q=${city}&days=6`;

    axios.get(currentStats)
    .then(response=>{

      setDisplayName(response.data.location.name);

      const allStats=response.data.current;
      setCurrTemp(allStats.temp_c);
      setFeelsLike(allStats.feelslike_c);

      setConditionText(allStats.condition.text);
      setConditionIcon(allStats.condition.icon);

      setHumidity(allStats.humidity);
      setCurrWind(allStats.wind_kph);
      setPressure(allStats.pressure_mb);
      setUV(allStats.uv);

      setLocalDate(response.data.location.localtime)

      
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })

    axios.get(sunTimes)
    .then(response => {

      const astroData = response.data.astronomy.astro;
    
      setSunRise(astroData.sunrise);
      setSunSet(astroData.sunset);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })

    axios.get(daysForecast)
    .then(response => {
      const weatherData = response.data.forecast.forecastday;
      const daysInfo=[];
      for(let i=1; i<6; i++){
        daysInfo.push(weatherData[i].day)
      }
      setDailyForecast(daysInfo);
  
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

    axios.get(hourForecast)
    .then(response => {
      const todayHours = response.data.forecast.forecastday[0].hour;
      const tomorrowHours = response.data.forecast.forecastday[1].hour;
      const currentHour = parseInt(response.data.location.localtime.slice(11, 13)); // Extracts the hour part
      
      const tempHours = [];
  
      for (let i = currentHour + 3; i < currentHour + 18; i += 3) {
        if(i<24){
          tempHours.push(todayHours[i]);
        }
        else{
          const adjustedIndex = i % 24;
          tempHours.push(tomorrowHours[adjustedIndex])
        }
      }
  
      setNextHours(tempHours);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

  }, [city]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div className="App">
      <MenuBar onCityChange={setCity}/>
      <div className='widget-container'>
        <TimeContainer city={displayName} localDate={localDate}/>
        <WeatherStats temperature={currTemp} feelsLike={feelsLike} sunrise={sunRise} sunset={sunSet} description={conditionText} descriptionIcon={conditionIcon} humidity={humidity} windSpeed={currWind} uvIndex={UV} pressure={pressure} />
      </div>
      <div className='widget-container'>
        <WeekForcast temperatures={dailyForecast}/>
        <HourlyForecast forecastHours={nextHours}/>
      </div>
      <Footer/>
    </div>
  );
};

export default App;

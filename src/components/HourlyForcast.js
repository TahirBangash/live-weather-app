import React from 'react';
import './HourlyForcast.css';
import { windImage } from '../images'; // Make sure to import the correct icons

const HourlyForecast = ({forecastHours}) => {

  const forecastData = forecastHours.map((hour) => ({
    time: hour.time.slice(11,16),
    temperature: hour.temp_c,
    wind: hour.wind_kph, 
    icon: hour.condition.icon,
  }));

  return (
    <div className='hourly-forecast-container'>
      <h1 className='hourly-title'>Hourly Forecast:</h1>
      <div className='widget-box'>
        {forecastData.map((hour, index) => (
            <div key={index} className='hour-forecast'>
                <span className='hourly-time'>{hour.time}</span>
                <img src={hour.icon} alt='weather icon' className='weather-icon' />
                <span className='hourly-temp'>{hour.temperature}°C</span>
                <img src={windImage} alt='wind icon' className='wind-icon' />
                <span className='hourly-wind'>{hour.wind}km/h</span>
            </div>
        ))}
      </div>

    </div>
  );
};

export default HourlyForecast
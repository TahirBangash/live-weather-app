// WeatherStats.js

import React from 'react';
import './WeatherStats.css'; // make sure to create this CSS file
import {humidityImage,pressureImage,sunriseImage, windImage, uvImage, sunsetImage} from '../images'

const WeatherStats = ({ temperature, feelsLike, humidity, windSpeed, sunrise, sunset, pressure, uvIndex, description, descriptionIcon }) => {
  return (
    <div className="weather-stats">
        <div className='space-between'>
            <div><div className="temperature">{temperature}°C </div><span className="feels-like">Feels like: {feelsLike}°C</span></div>
            <div className="sun-times">
                <div className="sun-rise-set">
                    <img src={sunriseImage} alt='sunrise icon' width={48} height={48}></img> 
                    <div className='vert-stack'>
                        <span className='sun-rise-set-text'>Sunrise: </span>
                        <span className='sun-rise-set-value'>{sunrise}</span>
                    </div>
                </div>
                <div className="sun-rise-set">
                    <img src={sunsetImage} alt='sunrise icon' width={48} height={48}></img> 
                    <div className='vert-stack'>
                        <span className='sun-rise-set-text'>Sunset: </span>
                        <span className='sun-rise-set-value'>{sunset}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="description">
            <img src={descriptionIcon} alt='sunny icon' width={270} height={270}/>
            {description}
        </div>
        <div className='details-whole'>
            <div className="details-1">
                <div className="alt-weather-info">
                    <img src={humidityImage} alt='humidity icon' width={60} height={50} style={{marginTop:'10px'}}/>
                    <span className='alt-t1'>{humidity}%</span>
                    <span className='alt-t2'>Humidity</span>
                </div>

                <div className="alt-weather-info">
                    <img src={ windImage} alt='wind icon' width={60} height={60}/>
                    <span className='alt-t1'>{windSpeed} km/h</span>
                    <span className='alt-t2'>Wind Speed</span>
                </div>
            </div>
            <div className="details-2">
                <div className="alt-weather-info">
                    <img src={pressureImage} alt='pressure icon' width={60} height={60}/>
                    <span className='alt-t1'>{pressure}hPa</span>
                    <span className='alt-t2'>Presure</span>
                </div>

                <div className="alt-weather-info">
                    <img src={uvImage} alt='uv icon' width={60} height={60}/>
                    <span className='alt-t1'>{uvIndex}</span>
                    <span className='alt-t2'>UV</span>
                </div>
            </div>
        </div>

    </div>
  );
};

export default WeatherStats;

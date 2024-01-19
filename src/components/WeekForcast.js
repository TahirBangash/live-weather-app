import React from 'react';
import './WeekForcast.css';

const WeekForcast = ({temperatures}) => {
  const today = new Date();


  const nextFiveDays = Array.from({ length: 5 }, (_, i) => {
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + i + 1);
    return { date: nextDay};
  });

  const options = { weekday: 'short', day: 'numeric', month: 'short' };

  return (
    <div className='forcast-container'>
      <h1 className='weektitle'>5 Days Forecast:</h1>
      {nextFiveDays.map((day, index) => (
        <div key={index} className='day-forcast'>
          <img src={temperatures[index] ? temperatures[index].condition.icon : 'https://cdn-icons-png.flaticon.com/128/6356/6356630.png'} alt='weather symbol' style={{ width: '60px', height: '60px' }} />
          <span className='daily-temp'>{temperatures[index] ? temperatures[index].avgtemp_c: 'loading...'}°C</span>
          <span className='daily-date'>{day.date.toLocaleDateString('en-US', options)}</span>
        </div>
      ))}
    </div>
  );
};


export default WeekForcast;

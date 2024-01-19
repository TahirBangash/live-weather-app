import React, { useState, useEffect } from 'react';
import './TimeContainer.css'

const TimeContainer = ({ city, localDate }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentDateTime = () => {
      setCurrentDateTime(new Date());
    };

    // Update the current date and time initially
    updateCurrentDateTime();

    // Refresh the date and time every minute (60000 milliseconds)
    const intervalId = setInterval(updateCurrentDateTime, 60000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const dateOptions = { weekday: 'long',  month: 'long', day: 'numeric' };

  return (
    <div className="timeContainer">
      <div className="city">{city}</div>
      <div className="time">{localDate ? localDate.slice(11,16) : 'Loading...'}</div>
      <div className="date">{currentDateTime.toLocaleDateString([], dateOptions)}</div>
    </div>
  );
}

export default TimeContainer;

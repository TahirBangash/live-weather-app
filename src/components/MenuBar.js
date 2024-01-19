import React, {useState} from 'react'

import './MenuBar.css'

import { locationIcon, searchIcon } from '../images';


const MenuBar = ({ onCityChange }) => {
  const [status, setStatus] = useState(true);
  const[inputValue,setInputValue]=useState("");

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          if((lat!=null) && (lon!=null)){
          onCityChange(`${lat},${lon}`);}
          else{
            alert('Location not found please try again')
          }
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const changeStatus = () => {
    setStatus(!status);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onCityChange(inputValue);
    }
  };


  return (
    <div className='menu-bar'>
      <div>
        <button onClick={changeStatus} className='toggleswitch'>
          <div className={status? 'on-status':'off-status'}></div>
        </button>
        <p className='toggle-text'> {status? 'Dark Mode':'Light Mode'}</p>
      </div>

      <div className="searchbar" >
        <img  src={searchIcon} width={30} height={35}/>
        <input type="search" id="form1" className="search-field" placeholder='Search for your preffered city ...' 
          aria-label="Search" onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>
      <button className='current-location' onClick={getLocation}><img src={locationIcon} alt ='location' width={35} height={35}/>Current Location</button> 
    </div>
  )
}

export default MenuBar

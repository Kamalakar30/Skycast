
import React from 'react';

const Hourlyweatheritem = ({ hourlyWeather }) => {
  const temperature = Math.floor(hourlyWeather.temp_c);
  const time = hourlyWeather.time.split(" ")[1].substring(0, 5);

  return (
    <li className='weatheritem'>
      <p className='time'>{time}</p>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/861/861059.png" 
        className="weathericon" 
        alt="weather icon" 
      />
      <p className='temperature'>{temperature}°C</p>
    </li>
  );
};

export default Hourlyweatheritem;

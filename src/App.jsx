
import React, { useState, useRef } from 'react';
import Searchsection from './components/Searchsection';
import Currentweather from './components/Currentweather';
import Hourlyweatheritem from './components/Hourlyweatheritem';
import NoResultsDiv from './components/NoResultsDiv.jsx'; 

const App = () => {
  const [weatherdata, setweatherdata] = useState({});
  const [hourlyforecast, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);

  const filterHourlyForecast = (hourlyData) => {
    const currentTime = new Date();
    const next24HoursTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);

    const filteredData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time);
      return forecastTime >= currentTime && forecastTime <= next24HoursTime;
    });

    setHourlyForecasts(filteredData);
  };

  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!data || !data.current) {
        setHasNoResults(true);
        return;
      }

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      setweatherdata({ temperature, description });
      setHasNoResults(false);

      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...(data.forecast.forecastday[1]?.hour || [])
      ];

      filterHourlyForecast(combinedHourlyData);
    } catch (error) {
      console.log('fetch error', error);
      setHasNoResults(true);
    }
  };

  return (
    <div className='container'>
      <Searchsection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />
      
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weathersection">
          {weatherdata.temperature && <Currentweather weatherdata={weatherdata} />}
          
          <div className="hourlyforecast">
            <ul className='weatherlist'>
              {hourlyforecast.map(hourlyWeather => (
                <Hourlyweatheritem key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

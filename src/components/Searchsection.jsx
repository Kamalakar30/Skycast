import React from 'react'

const Searchsection = ({getWeatherDetails,searchInputRef}) => {
     const API_KEY=import.meta.env.VITE_API_KEY;
     console.log("API_KEY:", API_KEY);

    const handlecitysearch=(e)=>{
        e.preventDefault();
        const searchInput=e.target.querySelector(".searchinput");
         const city = searchInput.value.trim();

    if (!city) return;
    const API_URL=` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY }&q=${searchInput.value}&days=2`;
         getWeatherDetails(API_URL);
        // const API_URL=` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY }&q=${city}&days=1&aqi=no&alerts=no`;
        //  getWeatherDetails(API_URL);
// {searchInput.value}
    }
    // const handleLocationSearch=()=>{
    //     navigator.geolocation.getCurrentPosition(
    //         position=>{
    //             console.log(position)
    //         },()=>{
    //             alert("location access denied.please enable permissions to use this feature")
    //         })
    // }
    const handleLocationSearch = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Latitude:", latitude, "Longitude:", longitude);

      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`;
      getWeatherDetails(API_URL);
    },
    () => {
      alert("Location access denied. Please enable permissions to use this feature.");
    }
  );
};

  return ( 
    <div className='search-section'>
        
        <form action="#" className='searchform' onSubmit={handlecitysearch}>
           <div className='searchicon'><span className="material-symbols-rounded">
search
</span> </div> 
           
          <input type='text' placeholder='Enter a city name '  ref={searchInputRef}className='searchinput' required/>
          <button type="submit" style={{ display: 'none' }}></button>
          
          
        </form>
         <div className="location-box">
  <button className="locationbutton" onClick={handleLocationSearch}>
    <span className="material-symbols-rounded">my_location</span>
  </button>
</div> 
</div>
    
  )
}

export default Searchsection

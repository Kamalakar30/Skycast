// import React from 'react'


//     const Currentweather = ({ weatherdata }) => {
//   const getIconByTemperature = (temp) => {
//     if (temp >= 35) {
//       return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; 
//     } else if (temp >= 25) {
//       return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; 
//     } else if (temp >= 15) {
//       return "https://cdn-icons-png.flaticon.com/512/414/414825.png"; 
//     } else {
//       return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; 
//     }
//   };

//   const icon = getIconByTemperature(weatherdata.temperature);

//   return (
//    <div className="currentweather">
       
//   <img 
//     src="https://cdn-icons-png.flaticon.com/512/861/861059.png" 
//     className="weathericon" 
//     alt="weather icon" 
  
//   />
//   <h2 className="tempertaure">{weatherdata.temperature}<span>°C</span></h2>
//   <p className="discription">{weatherdata.description}</p>  
// </div>
//   )
// }

// export default Currentweather
import React from "react";
//import "./CurrentWeather.css";   // adjust if you keep your styles elsewhere

/* ---------- ICONS ---------- */
const ICONS = {
  sunny:        "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  cloudy:       "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  rain:         "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  drizzle:      "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  thunder:      "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  snow:         "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  mist:         "https://cdn-icons-png.flaticon.com/512/1779/1779807.png",
  hot:          "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  warm:         "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  mild:         "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  cold:         "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
};

/* ---------- CONDITION‑BASED ICON ---------- */
const getIconByCondition = (text = "") => {
  const t = text.toLowerCase();
  if (t.includes("thunder"))        return ICONS.thunder;
  if (t.includes("snow"))           return ICONS.snow;
  if (t.includes("drizzle"))        return ICONS.drizzle;
  if (t.includes("rain"))           return ICONS.rain;        // catches “Rain”, “light rain”, etc.
  if (t.includes("cloud"))          return ICONS.cloudy;
  if (t.includes("mist") ||
      t.includes("fog")  ||
      t.includes("haze") ||
      t.includes("smoke"))          return ICONS.mist;
  if (t.includes("clear") || t.includes("sun")) return ICONS.sunny;
  return null;  // let temperature decide
};

/* ---------- TEMPERATURE‑BASED ICON ---------- */
const getIconByTemperature = (temp) => {
  if (temp >= 35) return ICONS.hot;
  if (temp >= 25) return ICONS.warm;
  if (temp >= 15) return ICONS.mild;
  return ICONS.cold;
};

/* ---------- COMPONENT ---------- */
const CurrentWeather = ({ weatherdata }) => {
  // Prefer condition icon; fall back to temperature icon
  const conditionIcon = getIconByCondition(weatherdata?.description);
  const icon = conditionIcon || getIconByTemperature(weatherdata?.temperature);

  return (
    <div className="currentweather">
      <img src={icon} className="weathericon" alt={weatherdata?.description} />
      <h2 className="temperature">
        {weatherdata?.temperature}
        <span>°C</span>
      </h2>
      <p className="description">{weatherdata?.description}</p>
    </div>
  );
};

export default CurrentWeather;

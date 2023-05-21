/* eslint-disable react/prop-types */
export default function WeatherCard({ temp, city, main, description, icon }) {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(`city: ${city}, temp: ${temp}`);
  console.log(`main: ${main}, description: ${description}`);
  return (
    <div className="weather-container">
      <h2 className="city">{city}</h2>
      <span>Today</span>
      <h1 className="temp">{temp}&deg;C</h1>
      <img src={iconUrl} alt="weather icon" />
      <hr />
      <span>
        {main} | {description}
      </span>
    </div>
  );
}

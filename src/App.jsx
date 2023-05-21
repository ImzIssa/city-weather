import { useEffect, useState } from "react";
import "./App.css";
import { getCurrentPosition, getWeather } from "./weatherAPI";
import WeatherCard from "./WeatherCard";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const data = await getWeather(latitude, longitude);
        const temp = data.main.temp;
        const city = data.name;
        // console.log(`city: ${city}, temp: ${temp}`);
        const { id, main, description, icon } = data.weather[0];
        // console.log(
        // `id: ${id}, main: ${main}, description: ${description}, icon: ${icon}`
        // );
        setWeather({
          temp,
          city,
          main,
          description,
          icon,
        });
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      }
      setIsLoading(false);
    };

    fetchWeather();
  }, []);

  const errorElement = <h2 className="error">Something Went Wrong?</h2>;
  const loadingElement = <h2 className="error">Loading...</h2>;

  return (
    <main>
      <h1 className="title">Weather App</h1>

      {!isLoading && !error ? (
        <WeatherCard {...weather} />
      ) : isLoading ? (
        loadingElement
      ) : (
        errorElement
      )}
    </main>
  );
}

export default App;

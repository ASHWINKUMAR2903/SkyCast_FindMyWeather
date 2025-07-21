import { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

const Weather = () => {
  const location = useLocation();
  const city = new URLSearchParams(location.search).get('city');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((res) => {
          setWeather(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [city]);

  const tempFahrenheit = useMemo(() => {
    return weather ? (weather.main.temp * 9) / 5 + 32 : null;
  }, [weather]);

  if (loading) return <p className="container">Loading weather...</p>;

  if (!weather) return <p className="container">Weather not found.</p>;

  return (
    <div className="container">
      <h2>Weather in {weather.name}</h2>
      <div className="weather-card">
        <p><strong>Temperature:</strong> {weather.main.temp} °C / {tempFahrenheit.toFixed(2)} °F</p>
        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        <p><strong>Condition:</strong> {weather.weather[0].description}</p>
      </div>
      <Link to="/">← Back to Home</Link>
    </div>
  );
};

export default Weather;
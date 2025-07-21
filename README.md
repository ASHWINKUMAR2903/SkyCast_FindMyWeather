# SkyCast - Find My Weather
## Date: 21-07-25
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
### Weather.jsx
```
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
```
### Home.jsx
```
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (city.trim() === '') {
        setError('Please enter a city name.');
        return;
      }
      navigate(`/weather?city=${encodeURIComponent(city)}`);
    },
    [city, navigate]
  );

  return (
    <div className="container">
      <h1>Find My Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
```
## Output:
<img width="1920" height="1080" alt="Screenshot 2025-07-21 195847" src="https://github.com/user-attachments/assets/15fa5b19-ba4a-4710-93bc-f767fc95b236" />
<img width="1920" height="1080" alt="Screenshot 2025-07-21 195859" src="https://github.com/user-attachments/assets/2c86b908-034d-455c-9c2e-e0faddafba39" />
<img width="1920" height="1080" alt="Screenshot 2025-07-21 195800" src="https://github.com/user-attachments/assets/1c0dc070-b9a8-4f2f-b895-8491c5427739" />

## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 

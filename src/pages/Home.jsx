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
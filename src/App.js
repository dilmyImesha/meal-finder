import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '1'; // Use the test API key
  const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

  const searchMeals = async (e) => {
    e.preventDefault();
    if (query) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meals. Please try again later.');
        }
        const data = await response.json();
        if (!data.meals) {
          throw new Error('No meals found. Please try a different search.');
        }
        setMeals(data.meals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <h1>Meal Finder</h1>
      <form onSubmit={searchMeals}>
        <input
          type="text"
          placeholder="Search for meals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="meals">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <p><strong>Category:</strong> {meal.strCategory}</p>
              <p><strong>Area:</strong> {meal.strArea}</p>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Recipe
              </a>
            </div>
          ))
        ) : (
          !loading && <p>No meals found. Try another search!</p>
        )}
      </div>
    </div>
  );
};

export default App;
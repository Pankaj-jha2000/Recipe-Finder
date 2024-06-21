import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; // Replace with your Edamam or Spoonacular API key
  const apiUrl = 'https://api.edamam.com/search'; // Adjust if using Spoonacular

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const searchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const response = await fetch(
        `${apiUrl}?q=${query}&app_id=YOUR_APP_ID&app_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Error fetching recipes');
      }
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for recipes"
      />
      <button onClick={searchRecipes}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <p>{recipe.recipe.source}</p>
            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

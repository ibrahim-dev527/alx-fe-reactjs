import { useState, useEffect } from "react";
// Import Link for navigation — like an <a> tag but for React Router
import { Link } from "react-router-dom";
import recipesData from "../data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HEADER ── */}
      <header className="bg-orange-500 text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">🍽️ Recipe Sharing Platform</h1>
        <p className="text-lg opacity-90">Discover and share delicious recipes</p>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          All Recipes
        </h2>

        {/* ── RECIPE GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Recipe Image */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {recipe.summary}
                </p>

                {/*
                  Link: navigates to /recipe/1, /recipe/2, etc.
                  We use template literal `...` to build the URL dynamically
                  recipe.id is the number from our data.json
                */}
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
                    View Recipe
                  </button>
                </Link>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}

export default HomePage;
import { useState, useEffect } from "react";
// useParams → reads URL parameters (like the :id from /recipe/:id)
// Link → lets us navigate back to home without page refresh
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

function RecipeDetail() {

  // useParams gives us an object with all URL parameters
  // Since our route is /recipe/:id, we destructure { id } from it
  // If user visits /recipe/3, then id = "3" (it's a string!)
  const { id } = useParams();

  // State to hold the single recipe we're viewing
  const [recipe, setRecipe] = useState(null);
  // null means "we haven't found the recipe yet"

  useEffect(() => {
    // Find the recipe whose id matches the URL parameter
    // We use Number(id) to convert the string "3" to the number 3
    // because our data.json uses numbers for ids
    const found = recipesData.find((r) => r.id === Number(id));

    // Save the found recipe into state so we can display it
    setRecipe(found);
  }, [id]);
  // [id] in the dependency array means: re-run this if id changes
  // (e.g., if user navigates from /recipe/1 to /recipe/2)

  // ── LOADING STATE ──
  // While we're finding the recipe, show a loading message
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading recipe...</p>
      </div>
    );
  }

  // ── MAIN RENDER ──
  // Once recipe is found, display it
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HEADER ── */}
      <header className="bg-orange-500 text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          {/*
            Link to="/" → clicking this goes back to the home page
            The ← is an HTML arrow character
          */}
          <Link
            to="/"
            className="inline-block mb-4 text-white hover:text-orange-200 font-semibold transition-colors duration-200"
          >
            ← Back to Recipes
          </Link>
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="mt-1 text-lg opacity-90">{recipe.summary}</p>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* ── RECIPE IMAGE ── */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-10">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        {/*
          Two-column layout on large screens, single column on mobile:
          grid-cols-1 → 1 column on mobile
          lg:grid-cols-2 → 2 columns on large screens
          gap-8 → space between columns
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── INGREDIENTS SECTION ── */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
              🧂 Ingredients
            </h2>

            {/*
              recipe.ingredients is an array of strings
              We map over it to create a list item for each ingredient
            */}
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                /*
                  key={index} → uses the position (0,1,2...) as the key
                  We use index when items don't have unique ids of their own
                */
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-600"
                >
                  {/* Green checkmark dot */}
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 flex-shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* ── PREPARATION STEPS SECTION ── */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
              👨‍🍳 Preparation Steps
            </h2>

            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  {/* Step number badge */}
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  {/* index + 1 because index starts at 0, but steps start at 1 */}
                  <p className="text-gray-600 pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* ── BACK BUTTON (bottom) ── */}
        <div className="mt-10 text-center">
          <Link to="/">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-md">
              ← Back to All Recipes
            </button>
          </Link>
        </div>

      </main>
    </div>
  );
}

export default RecipeDetail;
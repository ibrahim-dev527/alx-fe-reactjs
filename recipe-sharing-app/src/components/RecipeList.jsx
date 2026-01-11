import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  const recipesToDisplay =
    searchTerm.trim() === '' ? recipes : filteredRecipes;

  return (
    <div>
      <h2>Recipes</h2>
      {recipesToDisplay.length === 0 && <p>No recipes found.</p>}
      {recipesToDisplay.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;








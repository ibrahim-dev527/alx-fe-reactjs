import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  // Generate recommendations on mount
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 && <p>No recommendations yet.</p>}
      {recommendations.map((recipe) => (
        <div
          key={recipe.id}
          style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
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

export default RecommendationsList;

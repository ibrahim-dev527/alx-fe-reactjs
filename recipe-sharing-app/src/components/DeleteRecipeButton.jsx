import { useRecipeStore } from '../recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return (
    <button
      onClick={() => deleteRecipe(recipeId)}
      style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
    >
      Delete
    </button>
  );
};

export default DeleteRecipeButton;

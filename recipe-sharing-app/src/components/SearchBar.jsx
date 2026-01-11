import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  // Whenever searchTerm changes, automatically filter recipes
  useEffect(() => {
    filterRecipes();
  }, [searchTerm]);

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '8px',
        marginBottom: '15px',
        width: '100%',
        maxWidth: '400px',
        display: 'block',
      }}
    />
  );
};

export default SearchBar;

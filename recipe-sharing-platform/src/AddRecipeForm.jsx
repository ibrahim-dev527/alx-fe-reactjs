import { useState } from "react";

function AddRecipeForm() {

  // ── FORM STATE ──
  // Each input field has its own state variable

  // Tracks what's typed in the Title input
  const [title, setTitle] = useState("");

  // Tracks what's typed in the Ingredients textarea
  const [ingredients, setIngredients] = useState("");

  // Tracks what's typed in the Steps textarea
  const [steps, setSteps] = useState("");

  // ── ERROR STATE ──
  // Holds error messages for each field (empty string = no error)
  const [errors, setErrors] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  // ── SUCCESS STATE ──
  // Tracks whether the form was successfully submitted
  const [submitted, setSubmitted] = useState(false);

  // ── VALIDATION FUNCTION ──
  // Returns true if everything is valid, false if there are errors
  const validate = () => {

    // Start with no errors
    const newErrors = { title: "", ingredients: "", steps: "" };
    let isValid = true;

    // Rule 1: Title must not be empty
    // .trim() removes spaces from the beginning and end
    if (title.trim() === "") {
      newErrors.title = "Recipe title is required.";
      isValid = false;
    }

    // Rule 2: Ingredients must not be empty
    if (ingredients.trim() === "") {
      newErrors.ingredients = "Ingredients are required.";
      isValid = false;
    } else {
      // Rule 3: Ingredients must have at least 2 items
      // We expect each ingredient on a new line
      // .split("\n") breaks the text into an array by line breaks
      // .filter(line => line.trim() !== "") removes empty lines
      const ingredientLines = ingredients
        .split("\n")
        .filter((line) => line.trim() !== "");

      if (ingredientLines.length < 2) {
        newErrors.ingredients = "Please enter at least 2 ingredients (one per line).";
        isValid = false;
      }
    }

    // Rule 4: Steps must not be empty
    if (steps.trim() === "") {
      newErrors.steps = "Preparation steps are required.";
      isValid = false;
    }

    // Save errors to state so they display on screen
    setErrors(newErrors);

    return isValid;
  };

  // ── SUBMIT HANDLER ──
  // This function runs when the user clicks the Submit button
  const handleSubmit = (e) => {
    // e.preventDefault() stops the browser from refreshing the page
    // (default form behavior — we don't want that in React)
    e.preventDefault();

    // Run validation — only proceed if everything is valid
    if (!validate()) {
      return; // Stop here if there are errors
    }

    // If valid, build the new recipe object
    const newRecipe = {
      title: title.trim(),
      // Convert ingredients text into an array (split by new lines)
      ingredients: ingredients
        .split("\n")
        .filter((line) => line.trim() !== ""),
      // Convert steps text into an array (split by new lines)
      steps: steps
        .split("\n")
        .filter((line) => line.trim() !== ""),
    };

    // For now, log it to the console (no real database yet)
    console.log("New Recipe Submitted:", newRecipe);

    // Show success message
    setSubmitted(true);

    // Reset all fields back to empty
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({ title: "", ingredients: "", steps: "" });
  };

  // ── RENDER ──
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HEADER ── */}
      <header className="bg-orange-500 text-white py-8 text-center shadow-md">
        <h1 className="text-3xl font-bold">Add a New Recipe</h1>
        <p className="mt-1 opacity-90">Share your favourite dish with the world!</p>
      </header>

      {/* ── FORM CONTAINER ── */}
      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* ── SUCCESS MESSAGE ── */}
        {/* Only shown when submitted === true */}
        {submitted && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-800 rounded-xl px-5 py-4 text-center">
            <p className="font-semibold text-lg">🎉 Recipe submitted successfully!</p>
            <p className="text-sm mt-1">Your recipe has been added.</p>
            {/* Button to hide the success message and add another */}
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 text-sm text-green-700 underline hover:text-green-900"
            >
              Add another recipe
            </button>
          </div>
        )}

        {/* ── THE FORM ── */}
        {/* Only show the form when NOT yet submitted */}
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md p-8 space-y-6"
          >
            {/* space-y-6 adds vertical space between each form group */}

            {/* ── TITLE FIELD ── */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Recipe Title <span className="text-red-500">*</span>
              </label>
              {/*
                htmlFor="title" connects this label to the input with id="title"
                Clicking the label focuses the input — good for accessibility
              */}
              <input
                id="title"
                type="text"
                placeholder="e.g. Spaghetti Carbonara"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200
                  ${errors.title ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                  {/*
                    Conditional class: if there's a title error, show red border.
                    Otherwise show normal gray border.
                    This is called a "template literal with ternary operator"
                  */}
              />
              {/* Show error message if it exists */}
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* ── INGREDIENTS FIELD ── */}
            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Ingredients <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Enter each ingredient on a new line. Minimum 2 ingredients required.
              </p>
              <textarea
                id="ingredients"
                placeholder={`200g spaghetti\n100g pancetta\n2 large eggs`}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={6}
                className={`w-full border rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 resize-none
                  ${errors.ingredients ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors.ingredients && (
                <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>
              )}
            </div>

            {/* ── PREPARATION STEPS FIELD ── */}
            <div>
              <label
                htmlFor="steps"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Preparation Steps <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Enter each step on a new line, in order.
              </p>
              <textarea
                id="steps"
                placeholder={`Boil salted water\nCook pasta until al dente\nMix eggs and cheese`}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                rows={6}
                className={`w-full border rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 resize-none
                  ${errors.steps ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors.steps && (
                <p className="mt-1 text-sm text-red-500">{errors.steps}</p>
              )}
            </div>

            {/* ── SUBMIT BUTTON ── */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 rounded-xl transition-colors duration-200 shadow-md text-lg"
            >
              Submit Recipe 🍽️
            </button>

          </form>
        )}
      </main>
    </div>
  );
}

export default AddRecipeForm;
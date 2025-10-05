import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Utensils, ArrowLeft } from "lucide-react";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipeDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
      setRecipe(res.data.meals ? res.data.meals[0] : null);
    } catch (err) {
      setError("Failed to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      // Only push if the ingredient string is non-empty
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (loading)
    return (
      <div className="text-center p-12 text-teal-600 font-semibold text-xl">
        Loading recipe...
      </div>
    );
  if (error || !recipe)
    return (
      <div className="text-center p-12 text-red-500 font-semibold text-xl">
        {error || "Recipe not found."}
      </div>
    );

  const ingredientsList = getIngredients();

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl">
      <button
        onClick={() => navigate(-1)}
        className="text-teal-600 hover:text-teal-800 transition duration-150 mb-6 flex items-center font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Search Results
      </button>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        {recipe.strMeal}
      </h1>
      <p className="text-lg text-gray-500 mb-6">
        Category: {recipe.strCategory} | Cuisine: {recipe.strArea}
      </p>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md mb-8"
        onError={(e) => {
          e.target.onerror = null;
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-1 bg-teal-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-teal-800 mb-4 flex items-center">
            <Utensils size={24} className="mr-2" /> Ingredients
          </h2>
          <ul className="space-y-3 text-gray-700">
            {ingredientsList.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-start border-b border-teal-100 pb-2"
              >
                <span className="font-medium">{item.ingredient}</span>
                <span className="text-sm text-gray-600 ml-4">
                  {item.measure}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Instructions
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {recipe.strInstructions}
          </div>
        </div>
      </div>

      {}
      {recipe.strYoutube && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-150 font-medium"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;

import React from "react";
import { Link } from "react-router-dom";
import { Heart, Utensils } from "lucide-react";

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe;

  const getImageUrl = (url) => {
    return url;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transition duration-300 ease-in-out">
      {}
      <div className="relative">
        <img
          src={getImageUrl(strMealThumb)}
          alt={strMeal}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
          }}
        />

        <button
          onClick={() => onToggleFavorite(idMeal)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 shadow-md hover:bg-opacity-100 transition duration-150"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={24}
            className={
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>

      {}
      <div className="p-4 flex flex-col justify-between h-auto">
        <div>
          <h3
            className="text-xl font-bold text-gray-800 mb-2 truncate"
            title={strMeal}
          >
            {strMeal}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
            <Utensils size={16} />
            <span>
              {strCategory} / {strArea}
            </span>
          </div>
        </div>

        <Link
          to={`/recipe/${idMeal}`}
          className="mt-4 w-full text-center bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition duration-150 shadow-md"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;

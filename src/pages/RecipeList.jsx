import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.jsx";
import { Heart, SearchX } from "lucide-react";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const RecipeList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || {}
  );
  const query = searchParams.get("q") || "";
  const isFavoritesView = location.pathname === "/favorites";

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = useCallback(
    async (searchQuery) => {
      if (!searchQuery && !isFavoritesView) return setRecipes([]);

      setLoading(true);
      setError(null);

      try {
        if (isFavoritesView) {
          if (Object.keys(favorites).length === 0) {
            setRecipes([]);
            return;
          }

          const favoriteIds = Object.keys(favorites);
          const detailPromises = favoriteIds.map((id) =>
            axios.get(`${API_BASE_URL}/lookup.php?i=${id}`)
          );
          const results = await Promise.all(detailPromises);
          const favoriteRecipes = results
            .map((res) => res.data.meals?.[0])
            .filter((meal) => meal);
          setRecipes(favoriteRecipes);
        } else {
          const res = await axios.get(
            `${API_BASE_URL}/search.php?s=${searchQuery}`
          );
          setRecipes(res.data.meals || []);
        }
      } catch (err) {
        setError(
          "Failed to fetch recipes. Please check your network connection."
        );
      } finally {
        setLoading(false);
      }
    },
    [isFavoritesView, favorites]
  );

  useEffect(() => {
    fetchRecipes(query);
  }, [query, isFavoritesView, fetchRecipes]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = { ...prev };
      if (newFavs[id]) {
        delete newFavs[id];
      } else {
        newFavs[id] = true;
      }
      return newFavs;
    });
  };

  if (loading)
    return (
      <div className="text-center p-12 text-teal-600 font-semibold text-xl">
        Loading recipes...
      </div>
    );
  if (error)
    return (
      <div className="text-center p-12 text-red-500 font-semibold text-xl">
        {error}
      </div>
    );

  const headerText = isFavoritesView
    ? "Your Favorite Recipes"
    : query
    ? `Results for "${query}"`
    : "Search for a recipe above!";

  if (isFavoritesView && recipes.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-lg shadow-lg">
        <Heart size={48} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">No favorites yet</h2>
        <p className="text-gray-500">Find recipes you love and save them.</p>
      </div>
    );
  }

  if (!isFavoritesView && query && recipes.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-lg shadow-lg">
        <SearchX size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">No Recipes Found</h2>
        <p className="text-gray-500">Try a different dish name.</p>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        {headerText}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isFavorite={!!favorites[recipe.idMeal]}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

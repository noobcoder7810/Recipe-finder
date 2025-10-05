import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart } from "lucide-react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/recipes?q=${searchTerm}`);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-teal-600 mb-4 md:mb-0">
          Recipe Finder
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex w-full md:w-auto space-x-2"
        >
          <input
            type="text"
            placeholder="Search dish name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition duration-150 shadow-md flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </form>

        <Link
          to="/favorites"
          className="mt-4 md:mt-0 p-3 text-teal-600 hover:text-red-500 transition duration-150 flex items-center space-x-1"
        >
          <Heart size={24} fill="currentColor" />
          <span className="hidden sm:inline font-medium">favorites</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

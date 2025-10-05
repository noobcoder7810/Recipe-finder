# Recipe-finder
A responsive web application built to allow users to search for recipes, view full cooking details (ingredients and instructions), and save their favorite dishes for later viewing.

This project demonstrates strong frontend skills in API integration, state management, routing, and modern UI design using Tailwind CSS.

🚀 Key Features Implemented
Search Functionality: Users can search for recipes by dish name (e.g., "Pasta," "Chicken").

API Integration: Fetches real-time recipe data from TheMealDB API.

Recipe Details: Clicking a card navigates to a dedicated page showing comprehensive ingredients, measurements, and cooking instructions.

Favorites (Mid-Level Feature): Users can toggle a heart icon to save or remove recipes. Favorites are persisted across browser sessions using Local Storage.

Responsive UI: Fully adaptive layout using Tailwind CSS utility classes, ensuring optimal viewing on desktop, tablet, and mobile devices.

🛠️ Tech Stack
Component
Technology
Notes
Frontend
React
Core application framework.
Styling
Tailwind CSS & PostCSS
Utility-first CSS framework for rapid, custom styling.
Routing
react-router-dom
Handles navigation between the Search List and Detail pages.
API Client
Axios
Used for making asynchronous HTTP requests to TheMealDB.
Icons
lucide-react
Clean, modern icons (Search, Heart, Utensils).

⚙️ Setup and Installation Guide (CRA Environment)
Follow these steps exactly from your project's root directory (recipe-finder/).

1. Install Dependencies
Install all necessary application and development dependencies in one go:

npm install axios react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer

3. Run the Application
Once all files are placed in their respective folders (src/, src/components/, src/pages/) and configuration is complete, start the development server:

npm run start

The application will launch in your browser.

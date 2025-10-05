import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Layout from "./components/Layout.jsx";
import RecipeList from "./pages/RecipeList.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/favorites" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

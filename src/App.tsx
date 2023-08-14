import React from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
const LazyLogInPage = lazy(() => import("./Pages/LogInPage"));
const LazyHomePage = lazy(() => import("./Pages/HomePage"));
const LazyFavoritesPage = lazy(() => import("./Pages/FavoritesPage"));

function App() {
  return (
    <div className="div-app">
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<LazyLogInPage />} />
          <Route path="/home" element={<LazyHomePage />} />
          <Route path="/favorites" element={<LazyFavoritesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

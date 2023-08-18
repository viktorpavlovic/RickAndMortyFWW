import React, { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Loader from "./Components/Loader";
const LazyLogInPage = lazy(() => import("./Pages/LogInPage"));
const LazyHomePage = lazy(() => import("./Pages/HomePage"));
const LazyFavoritesPage = lazy(() => import("./Pages/FavoritesPage"));

function App() {
  useEffect(() => {
    const url = "https://rickandmortyapi.com/api/character";
    axios.get(url).then((response) => {
      userContext?.setData(response.data);
    });
  }, []);
  const getUser = localStorage.getItem("username");
  const getPassword = localStorage.getItem("password");
  const userContext = useContext(UserContext);

  return (
    <div className="div-app">
      <Suspense fallback={<Loader />}>
        <Routes>
          {getUser && getPassword ? (
            <>
              <Route path="/home" element={<LazyHomePage />} />
              <Route path="/favorites" element={<LazyFavoritesPage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LazyLogInPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

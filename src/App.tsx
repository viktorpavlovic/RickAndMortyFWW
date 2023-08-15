import React, { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Loader from "./Components/Loader";
const LazyLogInPage = lazy(() => import("./Pages/LogInPage"));
const LazyHomePage = lazy(() => import("./Pages/HomePage"));
const LazyFavoritesPage = lazy(() => import("./Pages/FavoritesPage"));

function App() {
  const getUser = localStorage.getItem("username");

  const getPassword = localStorage.getItem("password");
  const userContext = useContext(UserContext);
  console.log(userContext?.user);

  // console.log(getUser);
  // console.log(getPassword);
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

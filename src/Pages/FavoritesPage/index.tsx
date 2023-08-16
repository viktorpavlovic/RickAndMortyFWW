import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./favorites-page.scss";

const FavoritesPage = () => {
  return (
    <>
      <Header content="Logout" home="Home" />
      <div className="div-favorites-page">Favorites</div>
      <Footer />
    </>
  );
};

export default FavoritesPage;

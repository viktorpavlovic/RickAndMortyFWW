import React, { useContext, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import EditModal from "../../Components/EditModal";
import { Button } from "antd";
import can from "../../Assets/garbage-can.svg";
import { UserContext } from "../../Context/UserContext";
import "./favorites-page.scss";
type FieldType = {
  name?: string;
  species?: string;
};
const FavoritesPage = () => {
  const [modal, setModal] = useState(false);
  const [clickedChar, setClickedChar] = useState<FieldType | null>(null);
  const handleOpen = (char: FieldType) => {
    setClickedChar(char);
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  const userContext = useContext(UserContext);
  const favorites = userContext?.favorites;

  const updateFavorites = (updatedChar: FieldType) => {
    const updatedFavorites = favorites.map((char) =>
      char === clickedChar ? { ...char, ...updatedChar } : char
    );
    userContext?.setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    userContext?.setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Header content="Logout" home="Home" />
      <div className="div-favorites-page">
        <h1>Your Favorites</h1>

        {favorites?.map((char, i) => (
          <section key={i}>
            <h3>{char.name}</h3>
            <p>{char.species}</p>
            <img src={char.image} alt="" className="image" />
            <div className="middle">
              <img
                src={can}
                alt=""
                className="can"
                onClick={() => handleRemoveFavorite(i)}
              />
            </div>
            <Button type="primary" onClick={() => handleOpen(char)}>
              Edit
            </Button>
          </section>
        ))}
        {modal && (
          <EditModal
            handleClose={handleClose}
            clickedChar={clickedChar}
            updateFavorites={updateFavorites}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;

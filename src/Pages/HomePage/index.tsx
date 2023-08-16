import React, { useState } from "react";
import Header from "../../Components/Header";
import AllCharacters from "../../Components/AllCharacters";
import Footer from "../../Components/Footer";
import CharModal from "../../Components/CharModal";
import "./home-page.scss";
const HomePage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [clickedChar, setClickedChar] = useState(null);
  const handleOpen = (char: React.SetStateAction<null>) => {
    setClickedChar(char);
    setModal(true);
  };
  console.log(clickedChar);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <Header content="Logout" favorites="Favorites" />
      <div className="div-home-page">
        <AllCharacters handleOpen={handleOpen} />
        {modal && (
          <CharModal clickedChar={clickedChar} handleClose={handleClose} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

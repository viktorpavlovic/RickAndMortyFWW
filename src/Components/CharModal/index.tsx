import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "./modal.scss";
import { Button } from "antd";

interface Character {
  name: string;
  gender: string;
  species: string;
  status: string;
  image: string;
}
interface FavoriteCharacter {
  name: string;
  image: string;
  species: string;
}

interface CharModalProps {
  clickedChar: Character | null;
  handleClose: () => void;
}

const CharModal: React.FC<CharModalProps> = ({ clickedChar, handleClose }) => {
  const userContext = useContext(UserContext);

  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const addToFavorites = () => {
    if (clickedChar) {
      const { name, image, species } = clickedChar;
      const favoriteCharacter: FavoriteCharacter = { name, image, species };

      const isAlreadyInFavorites = userContext?.favorites.some(
        (char) => char.name === name
      );

      if (!isAlreadyInFavorites) {
        const updatedFavorites = [...userContext.favorites, favoriteCharacter];
        userContext?.setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    }
  };
  const isCharacterInFavorites = userContext?.favorites.some(
    (char) => char.name === clickedChar?.name
  );
  return (
    <div className="char-modal" onClick={handleOverlayClick}>
      <section>
        <span className="close-modal" onClick={handleClose}>
          X
        </span>
        <p>Name: {clickedChar?.name || "No character selected"}</p>
        <p>Gender: {clickedChar?.gender}</p>
        <p>Species: {clickedChar?.species}</p>
        <p
          className={
            clickedChar?.status === "Alive"
              ? "alive"
              : clickedChar?.status === "Dead"
              ? "dead"
              : ""
          }
        >
          Status: {clickedChar?.status}
        </p>
        <Button onClick={addToFavorites}>
          {isCharacterInFavorites ? "Already in Favorites" : "Add To Favorites"}
        </Button>
      </section>
    </div>
  );
};

export default CharModal;

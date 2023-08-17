import React from "react";
import "./modal.scss";
import { Button } from "antd";

interface Character {
  name: string;
  gender: string;
  species: string;
  status: string;
}

interface CharModalProps {
  clickedChar: Character | null;
  handleClose: () => void;
}

const CharModal: React.FC<CharModalProps> = ({ clickedChar, handleClose }) => {
  const handleOverlayClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
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
        <Button>Add To Favorites</Button>
      </section>
    </div>
  );
};

export default CharModal;

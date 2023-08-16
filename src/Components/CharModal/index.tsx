import React from "react";
import "./modal.scss";

interface Character {
  name: string;
  gender: string;
  species: string;
  status: string;
}

interface CharModalProps {
  clickedChar: Character | null;
  handleClose: Function;
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
        <p>{clickedChar?.name || "No character selected"}</p>
        <p>{clickedChar?.gender}</p>
        <p>{clickedChar?.species}</p>
        <p>{clickedChar?.status}</p>
      </section>
    </div>
  );
};

export default CharModal;

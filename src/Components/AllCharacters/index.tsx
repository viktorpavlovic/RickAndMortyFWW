import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader";
import "./all-char.scss";
interface AllCharactersProps {
  handleOpen: (char: any) => void;
}

const AllCharacters: React.FC<AllCharactersProps> = ({ handleOpen }) => {
  const userContext = useContext(UserContext);
  const characterNames = userContext?.data?.results;
  if (!userContext?.data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="div-all-characters">
      {characterNames?.map((char, i) => (
        <section onClick={() => handleOpen(char)} key={i}>
          <h3>{char.name}</h3>
          <img src={char.image} alt="" />
        </section>
      ))}
    </div>
  );
};

export default AllCharacters;

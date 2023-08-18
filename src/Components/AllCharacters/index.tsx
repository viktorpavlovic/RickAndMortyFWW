import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader";
import "./all-char.scss";
interface AllCharactersProps {
  handleOpen: (char: any) => void;
  searchType: string;
  searchValue: string;
}

const AllCharacters: React.FC<AllCharactersProps> = ({
  handleOpen,
  searchType,
  searchValue,
}) => {
  const userContext = useContext(UserContext);
  const characterData = userContext?.data?.results;

  let filteredCharacters = characterData;
  if (searchType === "name") {
    filteredCharacters = characterData?.filter((char) =>
      char.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else if (searchType === "species") {
    filteredCharacters = characterData?.filter((char) =>
      char.species.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else if (searchType === "status") {
    filteredCharacters = characterData?.filter((char) =>
      char.status.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else if (searchType === "gender") {
    filteredCharacters = characterData?.filter((char) =>
      char.gender.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  if (!userContext?.data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="div-all-characters">
      {filteredCharacters?.map((char, i) => (
        <section onClick={() => handleOpen(char)} key={i}>
          <h3>{char.name}</h3>
          <img src={char.image} alt="" />
        </section>
      ))}
    </div>
  );
};

export default AllCharacters;

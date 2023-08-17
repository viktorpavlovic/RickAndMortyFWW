import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Header from "../../Components/Header";
import AllCharacters from "../../Components/AllCharacters";
import Footer from "../../Components/Footer";
import CharModal from "../../Components/CharModal";
import SearchInput from "../../Components/SearchInput";
import SelectRick from "../../Components/SelectRick";
import "./home-page.scss";
const HomePage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [clickedChar, setClickedChar] = useState(null);
  const userContext = useContext(UserContext);

  const handleOpen = (char: React.SetStateAction<null>) => {
    setClickedChar(char);
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <Header content="Logout" favorites="Favorites" />

      <div className="div-home-page">
        <div className="inputs">
          <SearchInput
            placeholder="Search by Name"
            onSearch={(value) => userContext?.handleSearch(value, "name")}
          />
          <SearchInput
            placeholder="Search by Species"
            onSearch={(value) => userContext?.handleSearch(value, "species")}
          />
          <SelectRick />
        </div>
        <AllCharacters
          handleOpen={handleOpen}
          searchType={userContext?.searchType || ""}
          searchValue={userContext?.searchValue?.data || ""}
        />
        {modal && (
          <CharModal clickedChar={clickedChar} handleClose={handleClose} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

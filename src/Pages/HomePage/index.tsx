import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import Header from "../../Components/Header";
import AllCharacters from "../../Components/AllCharacters";
import Footer from "../../Components/Footer";
import CharModal from "../../Components/CharModal";
import SearchInput from "../../Components/SearchInput";
import StatusSelect from "../../Components/StatusSelect";
import GenderSelect from "../../Components/GenderSelect";
import RickPagination from "../../Components/Pagination";

import "./home-page.scss";
import { Button } from "antd";

const HomePage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [clickedChar, setClickedChar] = useState(null);
  const userContext = useContext(UserContext);
  const topRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleOpen = (char: React.SetStateAction<null>) => {
    setClickedChar(char);
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <Header content="Logout" favorites="Favorites" home="Home" />

      <div className="div-home-page" ref={topRef}>
        <div className="inputs">
          <SearchInput
            placeholder="Search by Name"
            onSearch={(value) => userContext?.handleSearch(value, "name")}
          />
          <SearchInput
            placeholder="Search by Species"
            onSearch={(value) => userContext?.handleSearch(value, "species")}
          />
          <StatusSelect
            onSearch={(value) => userContext?.handleSearch(value, "status")}
          />
          <GenderSelect
            onSearch={(value) => userContext?.handleSearch(value, "gender")}
          />
        </div>
        <AllCharacters
          handleOpen={handleOpen}
          searchType={userContext?.searchType || ""}
          searchValue={userContext?.searchValue?.data || ""}
        />
        {modal && (
          <CharModal clickedChar={clickedChar} handleClose={handleClose} />
        )}
        <RickPagination />
        <Button onClick={scrollToTop} className="top-btn">
          Top
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

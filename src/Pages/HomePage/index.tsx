import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Header from "../../Components/Header";
import AllCharacters from "../../Components/AllCharacters";
import Footer from "../../Components/Footer";
import CharModal from "../../Components/CharModal";
import SearchInput from "../../Components/SearchInput";
import StatusSelect from "../../Components/StatusSelect";
import GenderSelect from "../../Components/GenderSelect";
import RickPagination from "../../Components/Pagination";
import { Button } from "antd";
import axios from "axios";
import "./home-page.scss";

const HomePage: React.FC = () => {
  const userContext = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [clickedChar, setClickedChar] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [responseFail, setResponseFail] = useState(false);
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [freshData, setFreshData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const storedPage = localStorage.getItem("currentPage");
  const setCurrentPageUrl = userContext.setCurrentPageUrl;
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/character/?page=${storedPage}&name=${name}&status=${status}&gender=${gender}&species=${species}`;
    if (url) {
      axios
        .get(url)
        .then((response) => {
          userContext?.setData(response.data);
          userContext?.setNextPageUrl(response.data.info.next);
          userContext?.setPrevPageUrl(response.data.info.prev);
          userContext.setPages(response.data.info.pages);
          setResponseFail(false);
        })
        .catch((error) => {
          setResponseFail(true);
          setErrorMessage(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshData]);
  const setStoragePage = () => {
    localStorage.setItem("currentPage", "1");
  };
  const nameSearch = (name: React.SetStateAction<string>) => {
    setStoragePage();
    setName(name);
    setFreshData(!freshData);
    setCurrentPageUrl("https://rickandmortyapi.com/api/character?page=1");
  };
  const statusSearch = (status: React.SetStateAction<string>) => {
    setStoragePage();
    setStatus(status);
    setFreshData(!freshData);
    setCurrentPageUrl("https://rickandmortyapi.com/api/character?page=1");
  };
  const genderSearch = (gender: React.SetStateAction<string>) => {
    setStoragePage();
    setGender(gender);
    setFreshData(!freshData);
    setCurrentPageUrl("https://rickandmortyapi.com/api/character?page=1");
  };
  const speciesSearch = (species: React.SetStateAction<string>) => {
    setStoragePage();
    setSpecies(species);
    setFreshData(!freshData);
    setCurrentPageUrl("https://rickandmortyapi.com/api/character?page=1");
  };
  const resetFilters = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
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
        <h1 className="tittle">Home Page</h1>
        <div className="inputs">
          <SearchInput placeholder="Search by Name" onSearch={nameSearch} />
          <SearchInput
            placeholder="Search by Species"
            onSearch={speciesSearch}
          />
          <StatusSelect statusSearch={statusSearch} />
          <GenderSelect genderSearch={genderSearch} />
        </div>
        <Button onClick={resetFilters} className="reset-btn">
          Clear all filters
        </Button>
        {!responseFail ? (
          <>
            <AllCharacters handleOpen={handleOpen} />
            {modal && (
              <CharModal clickedChar={clickedChar} handleClose={handleClose} />
            )}
            <RickPagination freshData={freshData} />
            <Button onClick={scrollToTop} className="top-btn">
              Top
            </Button>
          </>
        ) : (
          <h1 className="bad-request">{errorMessage}</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

import React, { useRef } from "react";
import { Button } from "antd";
import { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import Logo from "../../Assets/logo.png";
import "./header.scss";

interface HeaderProps {
  content?: string;
  favorites?: string;
  home?: string;
}
const Header: React.FC<HeaderProps> = ({ content, favorites, home }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive_nav");
  };
  const userContext = useContext(UserContext);
  const isUserLoggedIn = localStorage.getItem("username" && "password");
  return (
    <header>
      <nav ref={navRef}>
        <img src={Logo} alt="Rick And Morty" />
        <p onClick={userContext?.navigateToFavorites}>{favorites}</p>
        <p onClick={userContext?.navigateToChar}>{home}</p>
        {isUserLoggedIn ? (
          <Button
            onClick={userContext?.navigateToHome}
            danger
            type="primary"
            className="logout-btn"
          >
            {content}
          </Button>
        ) : null}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button onClick={showNavbar} className="nav-btn">
        <FaBars />
      </button>
    </header>
  );
};

export default Header;

import React from "react";
import { Button } from "antd";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Logo from "../../Assets/logo.png";
import "./header.scss";

interface HeaderProps {
  content?: string;
  favorites?: string;
  home?: string;
}
const Header: React.FC<HeaderProps> = ({ content, favorites, home }) => {
  const userContext = useContext(UserContext);
  const isUserLoggedIn = userContext?.user !== null;
  return (
    <header>
      <img src={Logo} alt="Rick And Morty" />
      <p onClick={userContext?.navigateToFavorites}>{favorites}</p>
      <p onClick={userContext?.navigateToChar}>{home}</p>
      {isUserLoggedIn ? (
        <Button onClick={userContext?.navigateToHome} danger type="primary">
          {content}
        </Button>
      ) : null}
    </header>
  );
};

export default Header;

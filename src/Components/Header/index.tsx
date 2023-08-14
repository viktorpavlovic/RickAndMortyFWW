import React from "react";
import Logo from "../../Assets/logo.png";
import "./header.scss";

const Header = () => {
  return (
    <header>
      <img src={Logo} alt="Rick And Morty" />
    </header>
  );
};

export default Header;

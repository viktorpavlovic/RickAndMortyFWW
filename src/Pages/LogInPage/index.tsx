import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./login-page.scss";
import { Button } from "antd";

const LogInPage = () => {
  return (
    <>
      <Header />
      <div className="div-logIn-page">
        <Button type="default">LOG IN</Button>
      </div>
      <Footer />
    </>
  );
};

export default LogInPage;

import React from "react";
import { Button, Form, Input, message } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./login-page.scss";

const LogInPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const login = () => {
    if (userContext) {
      userContext.setUser({
        name: username,
        password: password,
      });
    }
    if (username === "rick" && password === "morty") {
      message.success("Login Successful!");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      navigate("/home");
    } else {
      message.error("Wrong credentials try again");
    }
  };
  const [form] = Form.useForm();
  const username = useWatch("myUsername", form);
  const password = useWatch("myPassword", form);

  return (
    <>
      <Header />
      <div className="div-login-page">
        <Form form={form} onFinish={login}>
          <Form.Item
            label="Username"
            name={"myUsername"}
            rules={[
              {
                required: true,
                message: "Please insert username",
              },
            ]}
          >
            <Input placeholder="USERNAME" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"myPassword"}
            rules={[
              {
                required: true,
                message: "Please insert password",
              },
            ]}
          >
            <Input.Password placeholder="PASSWORD" />
          </Form.Item>
          <Button type="default" htmlType="submit" block>
            LOG IN
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default LogInPage;

import React, { memo, useState } from "react";
import "./Header.scss";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import DarkMode from "../DarkMode/DarkMode";

const logout = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
};

const Header = memo(() => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>Chatik</div>

          <DarkMode />

          <div className="login__block">
            <div className="login__block-profile">
              Профиль
              <Avatar
                className="login__block-avatar"
                size={32}
                icon={<UserOutlined />}
              />
            </div>
            <Button shape="round" ping onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;

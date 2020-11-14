import { Switch } from "antd";
import React, { memo, useState } from "react";
import "./DarkCss.css";

const DarkMode = memo(() => {
  const body = document.body;
  const nowTheme = localStorage.getItem("theme");
  const [stateTheme, setTheme] = useState(nowTheme !== "light" ? true : false);
  if (nowTheme === null) {
    localStorage.setItem("theme", "light");
    body.classList.add("light");
  }

  if (nowTheme === "dark") {
    body.classList.add("dark");
  }

  const switchTheme = (e) => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      setTheme(false);
    }
    if (theme === "light") {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      setTheme(true);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Switch defaultChecked={stateTheme} onChange={switchTheme} />
      <div style={{ position: "absolute", top: 0, right: "-100px" }}>
        {!stateTheme ? "Другая тема" : "Светлая тема"}
      </div>
    </div>
  );
});

export default DarkMode;

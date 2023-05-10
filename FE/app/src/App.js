import "./App.css";
import React, { useState } from "react";
import Menu from "./components/header/Menu";
import LoginForm from "./components/login/LoginForm";

const INITIAL_MENU = [
  {
    onclick: {},
    data: "מידע כללי",
  },
  {
    onclick: {},
    data: "פקולטות",
  },
];

const App = () => {
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [isLogin, setIsLogIn] = useState(false);

  const addButtonToMenu = (newButton) => {
    setMenu((prevMenu) => {
      return [newButton, ...prevMenu];
    });
  };

  return (
    <div className="App">
      <Menu items={menu} />
      {!isLogin && <LoginForm onLogIn={setIsLogIn} />}
    </div>
  );
};

export default App;

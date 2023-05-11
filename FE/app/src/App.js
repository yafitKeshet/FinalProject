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
  // HEADER - Menu
  const [menu, setMenu] = useState(INITIAL_MENU);

  // BODY
  const [isLogin, setIsLogIn] = useState(false);

  // TODO
  const addButtonToMenu = (newButton) => {
    setMenu((prevMenu) => {
      return [newButton, ...prevMenu];
    });
  };

  return (
    <div className="App">
      {/* HEADER */}
      <Menu items={menu} />

      {/* BODY */}
      {/* lOGIN-PAGE */}
      {!isLogin && <LoginForm /* TODO*/ onLogIn={setIsLogIn} />}
      {/* REGISTER */}
      {/* FEED */}
      {/* PROFIL */}
    </div>
  );
};

export default App;

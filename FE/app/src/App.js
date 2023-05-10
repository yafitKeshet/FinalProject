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

  const addButtonToMenu = (newButton) => {
    setMenu((prevMenu) => {
      return [newButton, ...prevMenu];
    });
  };

  return (
    <div className="App">
      <Menu items={menu} />
      <LoginForm></LoginForm>
    </div>
  );
};

export default App;

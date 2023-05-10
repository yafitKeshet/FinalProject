import "./App.css";
import React, { useState } from "react";
import Menu from "./components/header/Menu";

const INITIAL_MENU = [
  {
    onclick: {},
    data: "פקולטות",
  },
  {
    onclick: {},
    data: "מידע כללי",
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
      <Menu items={INITIAL_MENU} />
    </div>
  );
};

export default App;

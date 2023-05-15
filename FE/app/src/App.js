import "./App.css";
import React, { useState } from "react";
// import Menu from "./components/header/Menu";
import Login from "./components/login/Login";
import Header from "./components/header/Header";

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
      return [...prevMenu, ...newButton];
    });
  };

  return (
    <div className="App">
      {/* HEADER */}
      <Header menu={menu} />

      {/* BODY */}
      {/* lOGIN-PAGE */}
      {!isLogin && (
        <Login /* TODO*/ login={setIsLogIn} addButtonToMenu={addButtonToMenu} />
      )}
      {/* REGISTER */}
      {/* FORGOT PASSWORD */}
      {/* FEED */}
      {/* PROFILE */}
    </div>
  );
};

export default App;

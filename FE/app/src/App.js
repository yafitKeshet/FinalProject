import "./App.css";
import React, { useState, useEffect } from "react";
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
  const [isLogeddin, setIsLogeddIn] = useState(false);

  // Runs when the apps start
  useEffect(() => {
    const storedUserLoggedINInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedINInformation === "1") {
      setIsLogeddIn(true);
    }
  }, []);
  // Login handler
  const loginHandler = (userData) => {
    addButtonToMenu([
      {
        onclick: {},
        data: "FEED",
      },
      {
        onclick: {},
        data: "משרות",
      },
      {
        onclick: {},
        data: "פרופיל",
      },
    ]);

    localStorage.setItem("isLoggedIn", "1");
    setIsLogeddIn(true);
  };

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
      {!isLogeddin && <Login /* TODO*/ login={loginHandler} />}
      {/* REGISTER */}
      {/* FORGOT PASSWORD */}
      {/* FEED */}
      {/* PROFIL */}
    </div>
  );
};

export default App;

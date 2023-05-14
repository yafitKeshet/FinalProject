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
  const [user, setUser] = useState([]);
  // BODY
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Runs when the apps start
  useEffect(() => {
    const storedUserLoggedINInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedINInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  // Login handler
  const loginHandler = (userData) => {
    const response = fetch(
      `http://localhost:8080/userValidation?user_email=${userData.user_email}`
    ).then((response) => {
      if (response.status === 200) {
      }
      if (response.status === 422) {
      }
      if (response.status === 404) {
        console.log("user ");
      }
    });

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
    setIsLoggedIn(true);
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
      {!isLoggedIn && <Login /* TODO*/ login={loginHandler} />}
      {/* REGISTER */}
      {/* FORGOT PASSWORD */}
      {/* FEED */}
      {/* PROFILE */}
    </div>
  );
};

export default App;

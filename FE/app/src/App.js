import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import ErrorModal from "./components/UI/ErrorModal";

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
  //ERRORS
  const [error, setError] = useState();

  const onConfirmError = () => {
    setError();
  };
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

    // const storedMenu = localStorage.getItem("menu").split(",");
    // if (storedMenu) setMenu(storedMenu);
  }, []);

  // Login handler
  const loginHandler = async (userData) => {
    // Save data of the user TODO
    localStorage.setItem("userName", userData.name);
    // Add  buttons to the menu
    addButtonToMenu([
      {
        onClick: {},
        data: "FEED",
      },
      {
        onClick: {},
        data: "משרות",
      },
      {
        onClick: {},
        data: "פרופיל",
      },
    ]);

    // Update user as LoggedIN
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  // LogOut handler
  const onLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setMenu(INITIAL_MENU);
  };

  // TODO
  const addButtonToMenu = (newButton) => {
    setMenu((prevMenu) => {
      return [...prevMenu, ...newButton];
    });

    localStorage.setItem("menu", { menu });
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={onConfirmError}
        />
      )}
      <div className="App">
        {/* HEADER */}
        <Header menu={menu} isLoggedIn={isLoggedIn} onLogOut={onLogOut} />

        {/* BODY */}
        {/* lOGIN-PAGE */}
        {!isLoggedIn && <Login login={loginHandler} onError={setError} />}
        {/* REGISTER-PAGE */}
        {/* FORGOT PASSWORD */}
        {/* FEED */}
        {/* PROFILE */}
      </div>
    </div>
  );
};

export default App;

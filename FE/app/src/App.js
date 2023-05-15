import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import ErrorModal from "./components/UI/ErrorModal";
import GeneralInformation from "./components/general_information/GeneralInformation";

const App = () => {
  const [isGeneralInformationPage, setGeneralInformationPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  const onGeneralInformationClick = () => {
    setGeneralInformationPage(true);
    setIsLoginPage(false);
  };

  const onMainPageClick = () => {
    setGeneralInformationPage(false);
    setIsLoginPage(true);
  };

  const INITIAL_MENU = [
    {
      onClick: onMainPageClick,
      data: "עמוד ראשי",
      page: { isLoginPage },
    },
    {
      onClick: onGeneralInformationClick,
      data: "מידע כללי",
    },
    {
      onclick: {},
      data: "פקולטות",
    },
  ];

  const saveCurrentPage = () => {
    menu.forEach((page) => {
      if (page.page === "true") {
        localStorage.setItem("page", page.page);
      }
    });
  };

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
      setIsLoginPage(true);
      setGeneralInformationPage(false);
    }
  }, []);

  // Login handler
  const loginHandler = async (userData) => {
    // Save data of the user TODO
    localStorage.setItem("userName", userData.name);
    // Add  buttons to the menu
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
        onclicks: {},
        data: "פרופיל",
      },
    ]);

    // Update user as LoggedIN
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    setIsLoginPage(false);
    setGeneralInformationPage(false);
  };

  // LogOut handler
  const onLogOut = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setMenu(INITIAL_MENU);
  };

  // Add button to menu header- on login
  const addButtonToMenu = (newButton) => {
    setMenu((prevMenu) => {
      return [...prevMenu, ...newButton];
    });
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
        {/* GENERAL INFORMATION-PAGE */}
        {isGeneralInformationPage && <GeneralInformation />}
        {/* lOGIN-PAGE */}
        {isLoginPage && <Login login={loginHandler} onError={setError} />}
        {/* REGISTER-PAGE */}
        {/* FORGOT PASSWORD */}
        {/* FEED */}
        {/* PROFILE */}
      </div>
    </div>
  );
};

export default App;

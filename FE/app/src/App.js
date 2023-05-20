import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import ErrorModal from "./components/UI/ErrorModal";
import GeneralInformation from "./components/general_information/GeneralInformation";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icons from "./components/icons/Icons";


const App = () => {
  // HEADER
  //    Menu
  const INITIAL_MENU = [
    {
      onclick: {},
      data: "התחברות/ הרשמה",
    },
    {
      onclick: {},
      data: "מידע כללי",
    },
    {
      onclick: {},
      data: "פקולטות",
    },
    {
      onclick: {},
      data: "גלריה",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: "",
    },
    {
      onclick: {},
      data: <Icons></Icons>,
    },
  ];

  const [menu, setMenu] = useState(INITIAL_MENU);
  //    Add button to menu header- on login
  const addButtonsToMenu = () => {
    setMenu((prevMenu) => {
      return [
        ...prevMenu,
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
      ];
    });
  };

  //    Pages
  const [pages, setPages] = useState({
    isLoginPage: false,
    isRegisterPage: false,
    isGeneralInformationPage: false,
    isFacultyPage: false,
    isFeedPage: false,
    isProfilePage: false,
  });

  //ERRORS
  const [error, setError] = useState();

  const onConfirmError = () => {
    setError();
  };

  const [user, setUser] = useState([]);

  // Forget password
  const [forgetPass, setForgetPass] = useState(false);

  const forgetPasswordHandler = () => {
    console.log("Forget password was clicking.");
    setForgetPass(true);
  };
  const onCancelForgetPassword = () => {
    setForgetPass(false);
  };

  // BODY
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Runs when the apps start
  useEffect(() => {
    const storedUserLoggedINInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedINInformation === "1") {
      setIsLoggedIn(true);
    }

    const storedCurrentPage = localStorage.getItem("currentPage");
    if (storedCurrentPage) setPages({ ...pages, [storedCurrentPage]: true });
    else setPages({ ...pages, isLoginPage: true });

    console.log(`starting in page: ${storedCurrentPage}`);
  }, []);

  // Login-PAGE

  //    Login handler
  const loginHandler = async (userData) => {
    // Save data of the user TODO
    localStorage.setItem("userName", userData.name);

    // Add buttons to the menu
    addButtonsToMenu();

    // Update user as LoggedIn
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);

    // Update current page
    setPages({
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isFacultyPage: false,
      isFeedPage: false,
      isLoginPage: false,
      isProfilePage: true,
    });

    // Save current page
    localStorage.setItem("currentPage", "isProfilePage");

    console.log(`page after login: ${localStorage.getItem("currentPage")}`);
  };

  //    LogOut handler
  const onLogOut = () => {
    // Update user as LogOut
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);

    // Remove data of the user TODO
    localStorage.removeItem("user");

    // Remove buttons from the menu
    setMenu(INITIAL_MENU);

    // Update current page
    setPages({
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isFacultyPage: false,
      isFeedPage: false,
      isLoginPage: true,
      isProfilePage: false,
    });

    // Save current page
    localStorage.setItem("currentPage", "isLoginPage");
    console.log(`page after logout: ${localStorage.getItem("currentPage")}`);
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
      {forgetPass && <ForgetPassword onCancel={onCancelForgetPassword} />}

      <div className="App">
        {/* HEADER */}
        <Header menu={menu} isLoggedIn={isLoggedIn} onLogOut={onLogOut} />

        {/* BODY */}
        {/* GENERAL INFORMATION-PAGE */}
        {pages.isGeneralInformationPage && <GeneralInformation />}
        {/* lOGIN-PAGE */}
        {pages.isLoginPage && (
          <Login
            onLogin={loginHandler}
            onError={setError}
            onForgetPassword={forgetPasswordHandler}
          />
        )}
        {/* REGISTER-PAGE */}
        {/* FORGOT PASSWORD */}
        {/* FEED */}
        {/* PROFILE */}
      </div>
    </div>
  );
};

export default App;

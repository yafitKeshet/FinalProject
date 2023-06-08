import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import ErrorModal from "./components/UI/ErrorModal";
import GeneralInformation from "./components/general_information/GeneralInformation";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import Icons from "./components/icons/Icons";
import Button from "./components/UI/Button";
import LoginFormModal from "./components/loginFormModal/LoginFormModal";
import Register from "./components/register/Register";
// import LoginForm from "./components/login/LoginForm";

const App = (props) => {
  // HEADER

  // POPUP
  const [isLoginFormModalOpen, setLoginFormModalOpen] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const [register, setRegister] = useState(false);

  // Register
  const registerHandler = () => {
    console.log("Register was clicked");
    setLoginFormModalOpen(false);
    setRegister(true);
  };
  const onCancelRegister = () => {
    setRegister(false);
  };

  // Forget password
  const forgetPasswordHandler = () => {
    console.log("Forget password was clicked");
    setLoginFormModalOpen(false);
    setForgetPass(true);
  };
  const onCancelForgetPassword = () => {
    setForgetPass(false);
  };

  // Login
  const toggleLoginFormModal = () => {
    console.log("Toggle login form modal");
    setLoginFormModalOpen((prevState) => !prevState);
  };

  //    Menu
  const INITIAL_MENU = [
    {
      onclick: toggleLoginFormModal,
      data: "התחברות/ הרשמה",
    },
    {
      onclick: () => {
        console.log("General Info button was clicked");
      },
      data: "מידע כללי",
    },
  ];

  const [menu, setMenu] = useState(INITIAL_MENU);
  //    Add button to menu header- on login
  const loggedInMenu = (props) => {
    setMenu((prevMenu) => {
      return [
        {
          onclick: () => {
            // Handle onclick action for "שלום" button
            console.log("שלום button clicked");
          },
          data: `שלום ${localStorage.getItem("userName")}`,
        },
        {
          onclick: () => {
            // Handle onclick action for "FEED" button
            console.log("FEED button clicked");
          },
          data: "FEED",
        },
        {
          onclick: () => {
            // Handle onclick action for "פרופיל" button
            console.log("פרופיל button clicked");
          },
          data: "פרופיל",
        },
        {
          onclick: () => {
            // Handle onclick action for "מידע כללי" button
            console.log("מידע כללי button clicked");
          },
          data: "מידע כללי",
        },
        {
          onclick: () => {
            // Handle onclick action for "משרות" button
            console.log("משרות button clicked");
          },
          data: "משרות",
        },
        { onclick: onLogOut, data: "התנתק" },
      ];

      // Exclude the first two elements of the previous menu (login/ signup & general info)
      // const updatedMenu = prevMenu.slice(2);

      // Concatenate the new buttons with the updated menu
      // return [...updatedMenu, ...newButtons];
    });
  };

  // Pages
  const [pages, setPages] = useState({
    isLoginPage: true,
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

  // const [user, setUser] = useState([]);

  // BODY
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Runs when the apps start
  useEffect(() => {
    const storedUserLoggedINInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedINInformation === "1") {
      setIsLoggedIn(true);
      loggedInMenu();
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
    console.log(userData);
    localStorage.setItem("userData", userData);
    console.log(localStorage.getItem("userData"));

    // Close the login form modal
    setLoginFormModalOpen(false);

    // Add buttons to the menu
    loggedInMenu();

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
    console.log("logout button clicked");
    localStorage.removeItem("isLoggedIn", "0");
    setIsLoggedIn(false);

    // Remove data of the user TODO
    localStorage.removeItem("userData");

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
      {/* REGISTER-PAGE */}
      {register && (
        <Register
          onCancel={onCancelRegister}
          onError={setError}
          onLogin={loginHandler}
        />
      )}
      {/* FORGOT PASSWORD */}
      {forgetPass && (
        <ForgetPassword
          onCancel={onCancelForgetPassword}
          onError={setError}
          onLogin={loginHandler}
        />
      )}
      \{/* LOGIN PASSWORD */}
      {isLoginFormModalOpen && (
        <LoginFormModal
          toggleLoginFormModal={toggleLoginFormModal}
          onLogin={loginHandler}
          onError={setError}
          onForgetPassword={forgetPasswordHandler}
          onRegister={registerHandler}
        />
      )}{" "}
      <div className="App">
        {/* HEADER */}
        <Header menu={menu} isLoggedIn={isLoggedIn} onLogOut={onLogOut} />

        {/* BODY */}
        {/* GENERAL INFORMATION-PAGE */}
        {pages.isGeneralInformationPage && <GeneralInformation />}
        {/* MAIN-PAGE */}
        {pages.isLoginPage && (
          <Login
            onLogin={loginHandler}
            onError={setError}
            onForgetPassword={forgetPasswordHandler}
          />
        )}

        {/* FEED */}
        {/* PROFILE */}
      </div>
    </div>
  );
};

export default App;

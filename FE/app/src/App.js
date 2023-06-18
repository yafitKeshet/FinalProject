import "./App.css";
import React, { useState, useEffect } from "react";
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
import Profile from "./components/profile/Profile";
import Feed from "./components/feed/Feed";
import Jobs from "./components/jobs/Jobs";

const App = (props) => {
  window.onbeforeunload = function () {
    localStorage.clear();
  };
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

  // Main
  const toggleMain = () => {
    console.log("Main button was clicked");

    setPages({
      isMainPage: true,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: false,
      isProfilePage: false,
    });

    // Save current page
    localStorage.setItem("currentPage", "isMainPage");

    console.log(
      `page after main btn clicked: ${localStorage.getItem("currentPage")}`
    );
  };

  // Pages
  const [pages, setPages] = useState({
    isMainPage: true,
    isRegisterPage: false,
    isGeneralInformationPage: false,
    isJobsPage: false,
    isFeedPage: false,
    isProfilePage: false,
  });

  // General Info
  const toggleGeneralInfo = () => {
    console.log("General Info button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: true,
      isJobsPage: false,
      isFeedPage: false,
      isProfilePage: false,
    });

    // Save current page
    localStorage.setItem("currentPage", "isGeneralInformationPage");

    console.log(
      `page after generalInfo btn clicked: ${localStorage.getItem(
        "currentPage"
      )}`
    );
  };

  // Profile
  const toggleProfile = () => {
    console.log("Profile button was clicked");

    setPages({
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: false,
      isMainPage: false,
      isProfilePage: true,
    });

    // Save current page
    localStorage.setItem("currentPage", "isProfilePage");

    console.log(
      `page after profile btn clicked: ${localStorage.getItem("currentPage")}`
    );
  };

  // Feed
  const toggleFeed = () => {
    console.log("Feed button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: true,
      isProfilePage: false,
    });

    // Save current page
    localStorage.setItem("currentPage", "isFeedPage");

    console.log(
      `page after feed btn clicked: ${localStorage.getItem("currentPage")}`
    );
  };

  // Jobs
  // General Info
  const toggleJobs = () => {
    console.log("Jobs button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: true,
      isFeedPage: false,
      isProfilePage: false,
    });

    // Save current page
    localStorage.setItem("currentPage", "isJobsPage");

    console.log(
      `page after jobs btn clicked: ${localStorage.getItem("currentPage")}`
    );
  };

  //    Menu
  const INITIAL_MENU = [
    {
      onclick: toggleLoginFormModal,
      data: "התחברות/ הרשמה",
    },
    { onclick: toggleMain, data: "עמוד ראשי" },
    {
      onclick: toggleGeneralInfo,
      data: "מידע כללי",
    },
  ];

  const [menu, setMenu] = useState(INITIAL_MENU);
  //    Add button to menu header- on login
  const loggedInMenu = (props) => {
    setMenu([
      {
        onclick: () => {
          // Handle onclick action for "שלום" button
          console.log("שלום button clicked");
        },
        data: `שלום ${localStorage.getItem("userName")}`,
      },
      INITIAL_MENU[1],
      INITIAL_MENU[2],
      {
        onclick: toggleFeed,
        data: "FEED",
      },
      {
        onclick: toggleProfile,
        data: "פרופיל",
      },

      {
        onclick: toggleJobs,
        data: "משרות",
      },
      { onclick: onLogOut, data: "התנתק" },
    ]);
  };

  //ERRORS
  const [error, setError] = useState();

  const onConfirmError = () => {
    setError();
  };

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
    if (storedCurrentPage)
      setPages((prev) => {
        return { ...prev, isMainPage: false, [storedCurrentPage]: true };
      });
    else
      setPages((prev) => {
        return { ...prev, isMainPage: true };
      });

    console.log(`starting in page: ${storedCurrentPage}`);
  }, []);

  // Login-PAGE

  //    Login handler
  const loginHandler = async (userData) => {
    // Save data of the user
    console.log("login: ", userData);
    // localStorage.setItem("userData", userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userName", userData.userName);
    // console.log(localStorage.getItem("userData"));

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
      isJobsPage: false,
      isFeedPage: true,
      isMainPage: false,
      isProfilePage: false,
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

    // Remove data of the user
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Remove buttons from the menu
    setMenu(INITIAL_MENU);

    // Update current page
    setPages({
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: false,
      isMainPage: true,
      isProfilePage: false,
    });

    // Save current page
    localStorage.setItem("currentPage", "isMainPage");
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
      {/* LOGIN PASSWORD */}
      {isLoginFormModalOpen && (
        <LoginFormModal
          toggleLoginFormModal={toggleLoginFormModal}
          onLogin={loginHandler}
          onError={setError}
          onForgetPassword={forgetPasswordHandler}
          onRegister={registerHandler}
        />
      )}
      <div className="App">
        {/* HEADER */}
        <Header menu={menu} isLoggedIn={isLoggedIn} onLogOut={onLogOut} />

        {/* BODY */}
        {/* GENERAL INFORMATION-PAGE */}
        {pages.isGeneralInformationPage && <GeneralInformation />}
        {/* MAIN-PAGE */}
        {pages.isMainPage && (
          <Login
            onLogin={loginHandler}
            onError={setError}
            onForgetPassword={forgetPasswordHandler}
          />
        )}

        {/* FEED */}
        {pages.isFeedPage && <Feed />}
        {/* PROFILE */}
        {pages.isProfilePage && <Profile />}
        {/* JOBS */}
        {pages.isJobsPage && <Jobs />}
      </div>
    </div>
  );
};

export default App;

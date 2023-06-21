import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import ErrorModal from "./components/UI/ErrorModal";
import GeneralInformation from "./components/general_information/GeneralInformation";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
// import Icons from "./components/icons/Icons";
// import Button from "./components/UI/Button";
import LoginFormModal from "./components/loginFormModal/LoginFormModal";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import Feed from "./components/feed/Feed";
import Jobs from "./components/jobs/Jobs";
import { getUserFromJWT } from "./components/user/user.ts";

const App = (props) => {
  const [user, setUser] = useState({});

  const onUpdateUser = (token) => {
    sessionStorage.setItem("token", token);
    let user = getUserFromJWT(token);
    setUser({ ...user, token: token });
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
    sessionStorage.setItem("currentPage", "isMainPage");

    console.log(
      `page after main btn clicked: ${sessionStorage.getItem("currentPage")}`
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
    sessionStorage.setItem("currentPage", "isGeneralInformationPage");

    console.log(
      `page after generalInfo btn clicked: ${sessionStorage.getItem(
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
    sessionStorage.setItem("currentPage", "isProfilePage");

    console.log(
      `page after profile btn clicked: ${sessionStorage.getItem("currentPage")}`
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
    sessionStorage.setItem("currentPage", "isFeedPage");

    console.log(
      `page after feed btn clicked: ${sessionStorage.getItem("currentPage")}`
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
    sessionStorage.setItem("currentPage", "isJobsPage");

    console.log(
      `page after jobs btn clicked: ${sessionStorage.getItem("currentPage")}`
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
  const loggedInMenu = (user) => {
    setMenu([
      {
        onclick: toggleMain,
        data: (
          <div
            style={{
              height: "100%",
              alignItems: "center",
              display: "flex",
              gap: "1rem",
            }}
          >
            <img
              src={user.user_image}
              alt="תמונה של המשתמש"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            שלום {user.private_name}
          </div>
        ),
      },
      INITIAL_MENU[2],
      {
        onclick: toggleFeed,
        data: "עמוד הבית",
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
    const storedUserLoggedINInformation = sessionStorage.getItem("isLoggedIn");
    if (storedUserLoggedINInformation === "1") {
      setIsLoggedIn(true);
      let token = sessionStorage.getItem("token");
      let user = getUserFromJWT(token);
      setUser({ ...user, token: token });
      loggedInMenu(user);
    }

    let storedCurrentPage = sessionStorage.getItem("currentPage");
    if (storedCurrentPage)
      setPages((prev) => {
        return { ...prev, isMainPage: false, [storedCurrentPage]: true };
      });
    else {
      storedCurrentPage = "isMainPage";
      setPages((prev) => {
        return { ...prev, isMainPage: true };
      });
    }

    console.log(`starting in page: ${storedCurrentPage}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login-PAGE

  //    Login handler
  const loginHandler = (token) => {
    let user = getUserFromJWT(token);
    setUser({ ...user, token: token });

    // Save data of the use
    sessionStorage.setItem("token", token);

    // Close the login form modal
    setLoginFormModalOpen(false);

    // Add buttons to the menu
    loggedInMenu(user);
    // Update user as LoggedIn
    sessionStorage.setItem("isLoggedIn", "1");
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
    sessionStorage.setItem("currentPage", "isFeedPage");

    console.log(`page after login: ${sessionStorage.getItem("currentPage")}`);
  };

  //    LogOut handler
  const onLogOut = async () => {
    // Update user as LogOut
    console.log("logout button clicked");
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);

    // Remove data of the user
    sessionStorage.removeItem("token");
    setUser({});

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
    sessionStorage.setItem("currentPage", "isMainPage");
    console.log(`page after logout: ${sessionStorage.getItem("currentPage")}`);
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
        {pages.isFeedPage && (
          <Feed onError={setError} moveToProfile={toggleProfile} user={user} />
        )}
        {/* PROFILE */}
        {pages.isProfilePage && (
          <Profile user={user} onUpdateUser={onUpdateUser} />
        )}
        {/* JOBS */}
        {pages.isJobsPage && <Jobs user={user} />}
      </div>
    </div>
  );
};

export default App;

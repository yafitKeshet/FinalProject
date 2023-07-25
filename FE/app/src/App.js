import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import ErrorModal from "./components/UI/ErrorModal";
import GeneralInformation from "./components/general_information/GeneralInformation";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginFormModal from "./components/loginFormModal/LoginFormModal";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import Feed from "./components/feed/Feed";
import Jobs from "./components/jobs/Jobs";
import Courses from "./components/courses/Courses";
import Forum from "./components/forum/Forum";
import Events from "./components/events/Events";

const App = (props) => {
  const [user, setUser] = useState({});

  const onUpdateUser = (props) => {
    sessionStorage.setItem("token", props.token);
    sessionStorage.setItem("user_name", props.user_name);
    sessionStorage.setItem("user_image", props.user_image);
    sessionStorage.setItem("user_email", props.user_email);

    setUser({
      token: props.token,
      user_name: props.user_name,
      user_image: props.user_image,
      user_email: props.user_email,
    });
    loggedInMenu({
      user_image: props.user_image,
      private_name: props.user_name.split(" ")[0],
    });
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
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
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
    isCoursesPage: false,
    isForumPage: false,
    isEventsPage: false,
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
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
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
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
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
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
    });

    // Save current page
    sessionStorage.setItem("currentPage", "isFeedPage");

    console.log(
      `page after feed btn clicked: ${sessionStorage.getItem("currentPage")}`
    );
  };

  // Jobs
  const toggleJobs = () => {
    console.log("Jobs button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: true,
      isFeedPage: false,
      isProfilePage: false,
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
    });

    // Save current page
    sessionStorage.setItem("currentPage", "isJobsPage");

    console.log(
      `page after jobs btn clicked: ${sessionStorage.getItem("currentPage")}`
    );
  };

  // Courses
  const toggleCourses = () => {
    console.log("Courses button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: false,
      isProfilePage: false,
      isCoursesPage: true,
      isForumPage: false,
      isEventsPage: false,
    });

    // Save current page
    sessionStorage.setItem("currentPage", "isCoursesPage");

    console.log(
      `page after courses btn clicked: ${sessionStorage.getItem("currentPage")}`
    );
  };

  // Forum
  const toggleForum = () => {
    console.log("Courses button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: false,
      isProfilePage: false,
      isCoursesPage: false,
      isForumPage: true,
      isEventsPage: false,
    });

    // Save current page
    sessionStorage.setItem("currentPage", "isForumPage");

    console.log(
      `page after Forum btn clicked: ${sessionStorage.getItem("currentPage")}`
    );
  };
  // Events
  const toggleEvents = () => {
    console.log("events button was clicked");

    setPages({
      isMainPage: false,
      isRegisterPage: false,
      isGeneralInformationPage: false,
      isJobsPage: false,
      isFeedPage: false,
      isProfilePage: false,
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: true,
    });

    // Save current page
    sessionStorage.setItem("currentPage", "isEventsPage");

    console.log(
      `page after events btn clicked: ${sessionStorage.getItem("currentPage")}`
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
      {
        onclick: toggleCourses,
        data: "קורסים",
      },
      {
        onclick: toggleForum,
        data: "פורום",
      },
      {
        onclick: toggleEvents,
        data: "אירועים",
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
      let user_name = sessionStorage.getItem("user_name");
      let user_image = sessionStorage.getItem("user_image");
      let user_email = sessionStorage.getItem("user_email");
      setUser({
        token: token,
        user_name: user_name,
        user_image: user_image,
        user_email: user_email,
      });

      loggedInMenu({
        user_image: user_image,
        private_name: user_name.split(" ")[0],
      });
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
  const loginHandler = (props) => {
    setUser({
      token: props.token,
      user_name: props.user_name,
      user_image: props.user_image,
      user_email: props.user_email,
    });

    // Save data of the user
    sessionStorage.setItem("token", props.token);
    sessionStorage.setItem("user_name", props.user_name);
    sessionStorage.setItem("user_image", props.user_image);
    sessionStorage.setItem("user_email", props.user_email);
    // Close the login form modal
    setLoginFormModalOpen(false);

    // Add buttons to the menu
    loggedInMenu({
      user_image: props.user_image,
      private_name: props.user_name.split(" ")[0],
    });
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
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
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
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_image");
    sessionStorage.removeItem("user_email");

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
      isCoursesPage: false,
      isForumPage: false,
      isEventsPage: false,
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
          <Profile onUpdateUser={onUpdateUser} user={user} />
        )}
        {/* JOBS */}

        {pages.isJobsPage && <Jobs moveToProfile={toggleProfile} user={user} />}

        {/* COURSES */}
        {pages.isCoursesPage && <Courses />}

        {/* Forum */}
        {pages.isForumPage && <Forum />}

        {/* EVENTS */}
        {pages.isEventsPage && <Events />}
      </div>
    </div>
  );
};

export default App;

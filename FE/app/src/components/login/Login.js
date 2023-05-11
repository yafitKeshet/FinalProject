import LoginForm from "./LoginForm";
import React from "react";
import "./Login.css";

const Login = (props) => {
  return (
    <div className="login-page">
      <div className="title">
        <p>אתר הבוגרים, האקדמית תל אביב יפו</p>
      </div>
      <img
        className="login-img"
        src="https://www.mta.ac.il/he-il/PublishingImages/Lists/Plazma/AllItems/549A2139_RAW.jpg"
        alt="תמונה של האקדמית"
      />
      <LoginForm className="login-form" onLogin={props.onLogin} />
    </div>
  );
};
export default Login;

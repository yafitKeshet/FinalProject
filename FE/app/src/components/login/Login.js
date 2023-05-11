import LoginForm from "./LoginForm";
import React from "react";
import "./Login.css";

const Login = (props) => {
  return (
    <div className="login-page">
      <div className="title">
        <p>אתר הבוגרים, האקדמית תל אביב יפו</p>
      </div>
      <div className="login-description">
        <p>
          קהילת בוגרי האקדמית תל אביב יפו.
          <br />
        </p>
        זה הזמן להצטרף לקהילת הבוגרות והבוגרים המשפיעה בישראל, בכדי שנוכל לעדכנך
        במגוון אירועים, חדשות והזדמנויות לפיתוח קריירה
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

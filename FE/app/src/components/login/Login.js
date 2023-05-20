import LoginForm from "./LoginForm";
import React, { useState } from "react";
import "./Login.css";
import Carousel from 'react-bootstrap/Carousel';


const Login = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="login-page">
        <div>
          <div>
          <h1 className="title">אתר הבוגרים - האקדמית תל אביב יפו</h1>

            <div className="login-description">
              <h4>
                קהילת בוגרי המכללה אקדמית תל אביב יפו
              </h4>
              <h5>
                זה הזמן להצטרף לקהילת הבוגרות והבוגרים המשפיעה בישראל, בכדי שנוכל לעדכנך
                במגוון אירועים, חדשות והזדמנויות לפיתוח קריירה
              </h5>
            </div>

            <div className="login-center">
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item interval={2000}>
                  <img src="./alumni1.jpg" className="login-carousel" />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                  <img src="./alumni2.jpg" className="login-carousel" />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                  <img src="./alumni3.jpg" className="login-carousel" />
                </Carousel.Item>
              </Carousel>
            </div>
            <div>
              <LoginForm
                className="login-form"
                onLogIn={props.onLogin}
                onForgetPassword={props.onForgetPassword}
                onError={props.onError}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;

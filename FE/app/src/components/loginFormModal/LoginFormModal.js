import React from "react";
import Card from "../UI/Card";
import LoginForm from "../login/LoginForm";
import classes from "./LoginFormModal.module.css";

const LoginFormModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.toggleLoginFormModal} />
      <Card className={classes.modal}>
        <LoginForm
          onLogin={props.onLogin}
          onForgetPassword={props.onForgetPassword}
          onError={props.onError}
          onRegister={props.onRegister}
        />
      </Card>
    </div>
  );
};

export default LoginFormModal;

import React from "react";
import Card from "../UI/Card";
import LoginForm from "../login/LoginForm";
import classes from "./LoginFormModal.module.css";
import Cancel from "../UI/SVG/Cancel";
import Separator from "../UI/Separator";

const LoginFormModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.toggleLoginFormModal} />
      <Card className={classes.modal}>
        <header className={classes.loginHeader}>
          <Cancel className={classes.loginCancelBtn} onClick={props.onCancel} />
          <h2>התחברות</h2>
        </header>
        <Separator />
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

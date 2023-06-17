import React from "react";
import Menu from "./Menu";
import "./Header.css";
import Icons from "../icons/Icons";


const Header = (props) => {
  return (
    <div className="header">
      <div className="menu-header">
      <div className="logo-header">
          <img src="./logoMTA.jpg" alt="לוגו האקדמית תל אביב יפו" className="logoMTA"/>
        </div>
        {/* {props.isLoggedIn && (
          <div className="user-menu">
            <Menu
              items={[
                { onClick: props.onLogOut, data: "התנתק" },
                {
                  onclick: {},
                  data: `שלום ${localStorage.getItem("userName")}`,
                },
              ]}
            />{" "}
          </div>
        )} */}
        <div className={`${props.isLoggedIn && "buttons-menu"}`}>
          <Menu items={props.menu}></Menu>
        </div>
      </div>
      <Icons></Icons>
    </div>
  );
};

export default Header;

import React from "react";
import Menu from "./Menu";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faTiktok } from "@fortawesome/free-brands-svg-icons"

const Header = (props) => {
  return (
    <div className="header">
      <div className="menu-header">
      <div className="logo-header">
          <img
            src="https://yt3.googleusercontent.com/ytc/AGIKgqM4YckxkigCs1Cjc9XDeyZp3e7Gn9I_AlhLusiteA=s900-c-k-c0x00ffffff-no-rj"
            alt="לוגו האקדמית תל אביב יפו"
          />
        </div>
        {props.isLoggedIn && (
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
        )}
        <div className={`${props.isLoggedIn && "buttons-menu"}`}>
          <Menu items={props.menu}></Menu>
        </div>
      </div>
      <div className="icons">
        <ul className="icons">
          <li>
            <a title="פייסבוק" target="_blank" id="facebook" href="https://www.facebook.com/AcademitTLV/">
              <FontAwesomeIcon icon={faFacebook} style={{color: "#0b12e0",}} className="fa-2xl"/>
            </a>
          </li>
          <li>
            <a title="אינסטגרם" target="_blank" id="instagram" href="https://www.instagram.com/academit_telaviv/">
            <FontAwesomeIcon icon={faInstagram} style={{color: "#0b12e0",}} className="fa-2xl"/>
            </a>
          </li>
          <li>
            <a title="לינקדאין" target="_blank" id="linkedin" href="https://www.linkedin.com/school/the-academic-college-of-tel-aviv-yaffo/">
              <FontAwesomeIcon icon={faLinkedin} style={{color: "#0b12e0",}} className="fa-2xl"/>
            </a>
          </li>
          <li>
            <a title="יוטיוב" target="_blank" href="https://www.youtube.com/user/MtaCollege" title="youtube">
              <FontAwesomeIcon icon={faYoutube} style={{color: "#0b12e0",}} className="fa-2xl"/>
            </a>
          </li>
          <li>
            <a title="טיקטוק" target="_blank" href="https://www.tiktok.com/@academit_telaviv">
              <FontAwesomeIcon icon={faTiktok} style={{color: "#0b12e0",}} className="fa-2xl"/>
            </a>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default Header;

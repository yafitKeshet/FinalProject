import React from "react";
import "./Icons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faTiktok } from "@fortawesome/free-brands-svg-icons"

const Icons = (props) => {
  return (
    <div className="icons">
            <ul className="icons">
            <li>
                <a title="פייסבוק" target="_blank" id="facebook" href="https://www.facebook.com/AcademitTLV/">
                <FontAwesomeIcon icon={faFacebook} className="fa-2xl"/>
                </a>
            </li>
            <li>
                <a title="אינסטגרם" target="_blank" id="instagram" href="https://www.instagram.com/academit_telaviv/">
                <FontAwesomeIcon icon={faInstagram} className="fa-2xl"/>
                </a>
            </li>
            <li>
                <a title="לינקדאין" target="_blank" id="linkedin" href="https://www.linkedin.com/school/the-academic-college-of-tel-aviv-yaffo/">
                <FontAwesomeIcon icon={faLinkedin} className="fa-2xl"/>
                </a>
            </li>
            <li>
                <a title="יוטיוב" target="_blank" href="https://www.youtube.com/user/MtaCollege">
                <FontAwesomeIcon icon={faYoutube} className="fa-2xl"/>
                </a>
            </li>
            <li>
                <a title="טיקטוק" target="_blank" href="https://www.tiktok.com/@academit_telaviv">
                <FontAwesomeIcon icon={faTiktok} className="fa-2xl"/>
                </a>
            </li>
            </ul>
        </div>
  );
};

export default Icons;


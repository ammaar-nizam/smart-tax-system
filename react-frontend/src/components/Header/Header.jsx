import React, { useState } from "react";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import "./Header.css";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <div className="h-title">
          <img src="./logo.png" alt="logo" />
          <h1>Inland Revenue Department</h1>
        </div>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <a href="">Services</a>
            <a href="">Guidance</a>
            <a href="">Feedback Form</a>
            <button className="button">
              <a href="">Contact Us</a>
            </button>
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <FiMenu size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;

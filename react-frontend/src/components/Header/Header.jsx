import React, { useState } from "react";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import useHeaderColor from "../../hooks/useHeaderColor";
import "./Header.css";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [dropdown, setDropdown] = useState(false);

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter paddings innerWidth h-container">
        <div className="h-title">
          <Link to="/">
            <img src="./logo.png" alt="logo" />
          </Link>
          <h1>Inland Revenue Department</h1>
        </div>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/guidance">Guidance</NavLink>
            <NavLink to="/feedback">Feedback Form</NavLink>
            <button className="button">Sign In</button>
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

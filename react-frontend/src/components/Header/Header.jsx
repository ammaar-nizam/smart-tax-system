import React, { useState } from "react";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import useHeaderColor from "../../hooks/useHeaderColor";
import "./Header.css";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [dropdown, setDropdown] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter paddings innerWidth h-container">
        <div className="h-title">
          <Link to="/">
            <img src="./logo.svg" alt="logo" />
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
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Sign In
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
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

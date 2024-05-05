import React, { useState, useEffect } from "react";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import useHeaderColor from "../../hooks/useHeaderColor";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const [agentUsername, setAgentUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
      // Decode the access token to extract the agent's username
      const decodedToken = jwtDecode(accessToken);
      setAgentUsername(decodedToken.agentUsername);
    }
  }, []);

  const handleSignOut = () => {
    // Clear the access token cookie
    Cookies.remove("access_token");
    // Clear the agentUsername state
    setAgentUsername("");
    // Clear the accessToken state
    setAccessToken("");
    window.location.href = "/";
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter paddings innerWidth h-container">
        <div className="h-title">
          <Link to="/">
            <img src="./logo1.png" alt="logo" />
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
            <NavLink to="/read-educational-resources">Guidance</NavLink>
            <NavLink to="/feedback">Feedback Form</NavLink>
            {accessToken ? (
              // If accessToken is present, render agent's username and sign-out button
              <>
                <p>Welcome, {agentUsername}</p>
                <Button
                  className="button"
                  onClick={handleSignOut}
                  sx={{
                    color: "white",
                    fontFamily: "Dosis",
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              // If accessToken is not present, render sign-in button
              <Button
                className="button"
                component={Link}
                to="/signin"
                sx={{
                  color: "white",
                  fontFamily: "Dosis",
                }}
              >
                Sign In
              </Button>
            )}
            {/* {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect} component={Link}
              to="/signin">
                Sign In
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )} */}
          </div>
        </OutsideClickHandler>
      </div>
    </section>
  );
};

export default Header;

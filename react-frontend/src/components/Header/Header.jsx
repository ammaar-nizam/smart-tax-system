import React, { useState } from "react";
import "./Header.css";

const Header = () => {

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <div className="h-title">
          <img src="./logo.png" alt="logo" />
          <h1>Inland Revenue Department</h1>
        </div>
        <div className="flexCenter h-menu">
          <a href="">Services</a>
          <a href="">Guidance</a>
          <a href="">Feedback Form</a>
          <button className="button">
            <a href="">Contact Us</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;

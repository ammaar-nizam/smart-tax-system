import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="flexCenter paddings innerWidth hero-container">
        {/*Left Section*/}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <h1>
              Smart <br />
              Tax
              <br />System
            </h1>
          </div>
          <div className="flexColStart hero-des">
            <span>Automating Estate Duty, Gift, and Inheritance</span>
            <span>Taxes Calculations and Management</span>
          </div>
        </div>
        {/*Right Section*/}
        <div className="hero-right"></div>
      </div>
    </section>
  );
};

export default Hero;

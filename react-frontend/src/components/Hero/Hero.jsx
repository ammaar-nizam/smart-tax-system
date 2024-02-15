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
              <br />
              System
            </h1>
          </div>
          <div className="flexColStart hero-des">
            <span>Automating Estate Duty, Gift, and Inheritance</span>
            <span>Taxes Calculations and Management</span>
          </div>
        </div>
        {/*Right */}
        <div className="flexColStart hero-right">
          <div className="hero-func-title">
            <h2>What You Can Do</h2>
          </div>
          <div className="flexColStart hero-func">
            <span>Estate duty tax return filing</span>
            <span>Gift tax return filing</span>
            <span>Inheritance tax return filing</span>
            <span>Easy tax payment</span>
            <span>Value Assessment</span>
            <span>Search property ownership information</span>
            <span>Search house prices</span>
            <span>Gift and Inheritance related document records</span>
            <span>Read educational resources</span>
            <span>Take me to Land Registry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

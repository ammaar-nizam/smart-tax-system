import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="flexCenter paddings innerWidth hero-container">
        {/*Left Section*/}
        <motion.div
          className="flexColStart hero-left"
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
          }}
        >
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
        </motion.div>
        {/*Right */}
        <motion.div
          className="flexColStart hero-right"
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
          }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

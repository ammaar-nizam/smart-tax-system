import React from "react";
import { motion } from "framer-motion";
import "./Departments.css";
const Departments = () => {
  return (
    <section className="d-wrapper">
      <motion.div
        className="paddings innerWidth flexCenter d-container"
        initial={{ y: "2rem", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 0.5,
          x: { duration: 0.5 },
        }}
      >
        <img src="./LawFirm.svg" alt="" />
        <img src="./Revenue.svg" alt="" />
        <img src="./Globe.svg" alt="" />
        <img src="./Triangle.svg" alt="" />
      </motion.div>
    </section>
  );
};

export default Departments;

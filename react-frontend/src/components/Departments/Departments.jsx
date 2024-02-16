import React from 'react'
import { motion } from "framer-motion";
import './Departments.css'
const Departments = () => {
  return (
    <section className="d-wrapper">
      <motion.div className="paddings innerWidth flexCenter d-container" initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: "linear",
              duration: 0.5,
              x: { duration: 0.5 }
            }}>
        <img src="./prologis.png" alt="" />
        <img src="./tower.png" alt="" />
        <img src="./equinix.png" alt="" />
        <img src="./realty.png" alt="" />
      </motion.div>
    </section>
  )
}

export default Departments

import React from 'react'
import Contact from "../components/Contact/Contact";
import Departments from "../components/Departments/Departments";
import Featured from "../components/Featured/Featured";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Tax from "../components/Tax/Tax";
const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient">
          <Hero />
        </div>
        <Departments />
        <Featured/>
        <Tax/>
        <Contact/>
        <NewsLetter/>
      </div>
    </div>
  )
}

export default Website

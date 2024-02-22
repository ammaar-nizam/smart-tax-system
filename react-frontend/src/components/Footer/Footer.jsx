import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="paddings innerWidth flexCenter footer-container">
        {/* left side */}
        <div className="flexColStart footer-left">
          <img src="./logo1.png" alt="" width={80} />
          <span className="secondaryText">
          The aim of the project, Smart Tax System, is to modernise and simplify <br />
          Sri Lanka's tax administration by automating computations for estate duty, <br />
          gift, and inheritance taxes, increasing transparency, and raisingbr
           overall tax compliance.
          </span>
        </div>

        <div className="flexColStart footer-right">
          <span className="primaryText">Follow Us</span>
          <span className="secondaryText">The following links open in a new tab</span>
          <div className="flexCenter footer-menu">
            <span>Twitter</span>
            <span>LinkedIn</span>
            <span>Facebook</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

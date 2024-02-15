import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Contact Us</span>
          <span className="primaryText">Still need help?</span>
          <span className="secondaryText">
            Make direct contact with the relevant team who are always ready to help you. 
            Not to worry! We got you covered.{" "}
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                
                  <div className="flexColStart detail">
                    <span className="primaryText">General Enquiries</span>
                    <span className="secondaryText">Contact us online, by phone or by post.</span>
                  </div>
                </div>
                <div className="flexCenter button">Contact</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  
                  <div className="flexColStart detail">
                    <span className="primaryText">Business Services</span>
                    <span className="secondaryText">For queries about business services.</span>
                  </div>
                </div>
                <div className="flexCenter button">Contact</div>
              </div>
            </div>

            {/* second row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  
                  <div className="flexColStart detail">
                    <span className="primaryText">Tax Penalties</span>
                    <span className="secondaryText">For queries about tax penalties</span>
                  </div>
                </div>
                <div className="flexCenter button">Contact</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  
                  <div className="flexColStart detail">
                    <span className="primaryText">Report Tax Fraud</span>
                    <span className="secondaryText">Monday to Friday, 8am to 5pm.</span>
                    <span className="secondaryText">Telephone:</span>
                    <span className="secondaryText">011 231 4048</span>
                  </div>
                </div>
    
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./contact.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  MdOutlineArrowDropDown
} from "react-icons/md";
import data from "../../utils/accordion.jsx";
import "./Tax.css";

const Tax = () => {
  return (
    <section className="t-wrapper">
      <div className="paddings innerWidth flexCenter t-container">
        {/* Left Side */}
        <div className="t-left">
          <div className="image-container">
            <img src="./new-tax.png" alt="" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flexColStart t-right">
          <span className="orangeText">Newly Introduced Tax</span>
          <span className="primaryText">What Do They Mean</span>
          <span className="secondaryText">
            Unlock the meaning behind newly introduced taxes with our guide,
            offering
            <br />
            insights and clarity on their implications for individuals and
            businesses.
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {data.map((item, i) => {
              const [className, setClassName] = useState(null);
              return (
                <AccordionItem className={`accordionItem ${className}`} key={i} uuid={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordionButton">
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded
                            ? setClassName("expanded")
                            : setClassName("collapsed")
                        }
                      </AccordionItemState>
                      <span className="primaryText">{item.heading}</span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Tax;

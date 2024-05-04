import React from "react";
import { Outlet } from "react-router-dom";

const InheritanceTax = () => {
  return (
    <>
    <div>
      <Outlet/>
      Inheritance Tax Calculation Takes Place Here
    </div>
    </>
    
  );
};

export default InheritanceTax;
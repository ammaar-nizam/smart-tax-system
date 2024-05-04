import React from "react";
import { Outlet } from "react-router-dom";

const GiftTax = () => {
  return (
    <>
    <div>
      <Outlet/>
      Gift Tax Calculation Takes Place Here
    </div>
    </>
    
  );
};

export default GiftTax;
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const EstateDutyTax = () => {
  return (
    <>
    <div>
      <Sidebar/>
      <Outlet/>
      Estate Duty Tax Calculation Takes Place Here
    </div>
    </>
    
  );
};

export default EstateDutyTax;
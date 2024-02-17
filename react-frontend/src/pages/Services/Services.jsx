import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Services = () => {
  return (
    <>
    <div>
      <Sidebar/>
      <Outlet/>
    </div>
    </>
    
  );
};

export default Services;

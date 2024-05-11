import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import React from 'react'

const AuthLayout = () => {
  return (
    <>
    <div>
        <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default AuthLayout
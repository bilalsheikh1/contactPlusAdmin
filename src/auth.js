import React from "react";
import Main from "./components/Main/Main";
import Dashboard from "./components/dashboard/dashboard";
import SideBar from "./components/SideBar/SideBar";

const isLogin = () => {
    if(localStorage.getItem("loggedIn")!=null && localStorage.getItem("loggedIn")!="")
        return true;
    return false;
}

export default isLogin
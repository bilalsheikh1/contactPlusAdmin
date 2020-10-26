import React from "react";
import Main from "./components/Main/Main";
import Dashboard from "./components/dashboard/dashboard";
import SideBar from "./components/SideBar/SideBar";

const auth = () => {
    if(localStorage.getItem("ACCESS_TOKEN")!=null && localStorage.getItem("ACCESS_TOKEN")!="")
        return (<SideBar />);
    else
        return (<Main />);
}

export default auth
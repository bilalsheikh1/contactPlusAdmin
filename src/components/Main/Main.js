import React from 'react';
import '../../App.css';
import {Redirect,BrowserRouter as Router, Switch, Link, Route} from "react-router-dom";

import {Image, Menu , Layout} from "antd";

// import Routes from "../Routes";
import Register from "../Register/Register";
import Login from "../Login/Login";
// import PrivateRoute from "../../Routes/PrivateRoute";
import Home from "../Home/Home";
import SideBar from "../SideBar/SideBar";
import PrivateRoute from "../../Routes/PrivateRoute";
import PublicRoute from "../../Routes/PublicRoute";
import Dashboard from "../dashboard/dashboard";
import Users from "../user/users";
import Inbound from "../Agent/Inbound";
import Outbound from "../Agent/Outbound";
import Blended from "../Agent/Blended";
import RoutesInbound from "../Routes/RoutesInbound";
import RoutesOutbound from "../Routes/RoutesOutbound";
import IVR from "../IVR/IVR";
import Queues from "../Queues/Queuse";
import Extension from "../extension/Extension";
import System from "../SystemSetting/System";
import changePassword from "../changePassword/changePassword";
import WorkCode from "../WorkCode/WorkCode";
import PauseReason from "../PauseReason/PauseReason";
import Routes from "../../Routes";



const {Header} = Layout;
function Main() {
    let item = localStorage.getItem("loggedIn")
    return (
                <>
                    {(item== "" || item==null) &&
                    <Layout>
                        <Header>
                            <div className="logo">
                                <Image src="images/logo.png"/>
                            </div>

                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['100']}>
                                <Menu.Item key="101">
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                                <Menu.Item key="102">
                                    <Link to="/register">Register</Link>
                                </Menu.Item>
                            </Menu>
                        </Header>

                        <Switch>
                            <PublicRoute exact restricted={false} path='/' component={Login}/>
                            <PublicRoute path="/login" restricted={false} component={Login}/>
                            <PublicRoute path="/register" component={Register}/>
                        </Switch>

                    </Layout>
                    }
                    {
                        (item!="" && item!=null) && <SideBar />
                    }

                </>
    );
}

export default Main;

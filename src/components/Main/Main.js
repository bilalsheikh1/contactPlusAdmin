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



const {Header} = Layout;

function Main() {
    return (
        <>
            <Layout>

                <Header>
                    <div className="logo"  >
                        <Image src="images/logo.png"  />
                    </div>

                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/login" >Login</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/register">Register</Link>
                        </Menu.Item>
                    </Menu>
                </Header>

            </Layout>
            <div>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />

                    {/*<PrivateRoute path="/home" >*/}
                    {/*    <Redirect to='/dashboard' component={SideBar}/>*/}
                    {/*</PrivateRoute>*/}
                </Switch>
            </div>
        </>
    );
}
//
// const PrivateRoute = ({component: Component, ...rest}) => {
//     return (
//
//         // Show the component only when the user is logged in
//         // Otherwise, redirect the user to /signin page
//         <Route {...rest} render={props => (
//             location.getItem("ACCESS_TOKEN") ?
//                 <Component {...props} />
//                 : <Redirect to="/signin" />
//         )} />
//     );
// };

export default Main;

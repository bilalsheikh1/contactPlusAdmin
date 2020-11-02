import {Redirect, Route} from "react-router-dom";
import React  from 'react';
import isLogin from "../auth";

const PrivateRoute = ({ component : Component, ...rest }) => {
    console.log(isLogin())
    return (
        <Route
            {...rest}
            render={ props =>
            isLogin() ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default PrivateRoute;
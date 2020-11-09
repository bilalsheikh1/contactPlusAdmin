import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../auth';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    console.log("oik")
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};
// <Component {...props} />
export default PublicRoute;
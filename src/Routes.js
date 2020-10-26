import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-dom"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";



const Routes = (props) => (
    <Router {...props}>
        <Switch>
            <Route path={"/"} >
                <Login />
            </Route>
            <Route path={"/register"} component={Register} />
        </Switch>
    </Router>
);

export default Routes;
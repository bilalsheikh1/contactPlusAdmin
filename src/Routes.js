import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-dom"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Users from "./components/user/users";
import Inbound from "./components/Agent/Inbound";
import Outbound from "./components/Agent/Outbound";
import Blended from "./components/Agent/Blended";
import RoutesInbound from "./components/Routes/RoutesInbound";
import RoutesOutbound from "./components/Routes/RoutesOutbound";
import IVR from "./components/IVR/IVR";
import Queues from "./components/Queues/Queuse";
import Extension from "./components/extension/Extension";
import System from "./components/SystemSetting/System";
import changePassword from "./components/changePassword/changePassword";
import WorkCode from "./components/WorkCode/WorkCode";
import PauseReason from "./components/PauseReason/PauseReason";
import Main from "./components/Main/Main";



const Routes = () => {
     return (
             <Switch>
                 <PublicRoute exact restricted={false} path='/' component={Login}/>
                 <PublicRoute path="/login" restricted={false} component={Login}/>
                 <PublicRoute path="/register" component={Register}/>
                 <PrivateRoute path='/dashboard' restricted={false}  exact component={Dashboard} />
                 <PrivateRoute path="/users" restricted={true} component={Users} />
                 <PrivateRoute path="/actionInbound" component={Inbound} />
                 <PrivateRoute path="/actionOutbound" component={Outbound} />
                 <PrivateRoute path="/actionBlended" component={Blended} />
                 <PrivateRoute path="/routesInbound" component={RoutesInbound} />
                 <PrivateRoute path="/routesOutbound" component={RoutesOutbound} />
                 <PrivateRoute path="/IVR" component={IVR} />
                 <PrivateRoute path="/Queues" component={Queues} />
                 <PrivateRoute path="/extension" component={Extension} />
                 <PrivateRoute path="/register" component={Register} />
                 <PrivateRoute path="/setting" component={System} />
                 <PrivateRoute path="/changePassword" component={changePassword} />
                 <PrivateRoute path="/workcode" component={WorkCode} />
                 <PrivateRoute path="/pauseReason" component={PauseReason} />
             </Switch>
     );
}

export default Routes;
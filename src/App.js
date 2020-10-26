import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Link, Route} from "react-router-dom";
import {Image, Menu , Layout} from "antd";
import Main from "./components/Main/Main";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./components/Home/Home";
import SideBar from "./components/SideBar/SideBar";


const {Header} = Layout;

function App() {
  return (
      <Router>
          {/*<Route path="/" component={Main} />*/}
          <Route path="/" component={SideBar} />
      </Router>
  );
}

export default App;

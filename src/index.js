import React from 'react';
import ReactDOM ,{Route} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Switch} from "antd";
import Routes from "./Routes";
import {Provider} from "react-redux";
import configureStore from "./helper/store";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/LoginUser";

const store = configureStore();
// const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

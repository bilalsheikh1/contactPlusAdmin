import {Types} from "../constants/user.constants";
// import {userServices} from "../services/users.services"
import axios from "axios";
import React, {useState} from 'react';
import SideBar from "../components/SideBar/SideBar";
import {Redirect} from "react-router-dom";
import apiClient from "../axios/axios";


// export const ActionCreator = {
//     // logins
// }
export const logins =  ({user}) => (dispatch) => {
      console.log("Login...", user);
     axios.defaults.withCredentials = true;
      apiClient.get('/sanctum/csrf-cookie').then(response => {
          apiClient.post('/login', {
              username: user.username,
              password: user.password
          }).then(response => {
              console.log(response)
              localStorage.setItem("loggedIn" , true)
              console.log(localStorage.getItem("loggedIn"));
              dispatch(login(user))
          }).catch(error => {
              console.log(error)
              dispatch(loginFail(user))
          })
      })

    function login (user) {
        return {type : Types.LOGIN , payload : {user} , status : "true"}
    }
    function loginFail (user) {
        return {type : Types.LOGIN_FAILURE , payload : {user}, status : "false" }
    }
}

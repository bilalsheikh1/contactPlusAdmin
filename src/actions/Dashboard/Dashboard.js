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
export const Dashboard =  () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        apiClient.post('/api/dashboard').then(response => {
            console.log(response)
            localStorage.setItem("loggedIn" , "true")
            console.log(localStorage.getItem("loggedIn"));
            dispatch(dashboard(response.user))
        }).catch(error => {
            console.log(error)

        })
    })

    function dashboard (user) {
        return {type : Types.LOGIN , payload : {user} , status : "true"}
    }
}

import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import { Redirect } from "react-router-dom";
import {LOGOUT} from "../APIConstant";
import { Link, useHistory } from "react-router-dom";
// import createBrowserHistory from "../../components/history/history";


export  const userLogout =  () => (dispatch) => {

    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post("/"+LOGOUT).then(response => {
                // localStorage.setItem('loggedIn' , false)
                localStorage.clear()
                dispatch(logout())
            })
        }
    })
    function logout () {
        return {type : Types.LOGOUT , payload : true , status : "true"}
    }
}

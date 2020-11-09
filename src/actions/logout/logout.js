import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import { Redirect } from "react-router-dom";
import {LOGOUT} from "../APIConstant";
// import { Link, useHistory } from "react-router-dom";
// import createBrowserHistory from "../../components/history/history";


export  const userLogout =  () => (dispatch) => {
    // const history = useHistory();

    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post("/"+LOGOUT).then(response => {
                console.log(response.data)
                localStorage.setItem('loggedIn' , false)
                dispatch(logout())
                // eslint-disable-next-line no-restricted-globals
                // history.forward("/login");
                localStorage.clear();
            })
        }
    })
    function logout () {
        return {type : Types.LOGOUT , payload : true , status : "true"}
    }
}

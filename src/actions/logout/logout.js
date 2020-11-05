import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";

export  const userLogout =  () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post("/logout" , {logout : 'logout'}).then(response => {
                console.log(response.data)
                localStorage.setItem('loggedIn' , false)
                dispatch(logout(response.data))
            })
        }
    })
    function logout (data) {
        return {type : Types.LOGOUT , payload : data , status : "true"}
    }
}

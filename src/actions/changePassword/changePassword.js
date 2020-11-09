import {Types} from "../../constants/user.constants";
// import {userServices} from "../services/users.services"
import axios from "axios";
import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import apiClient from "../../axios/axios";
import {UPDATEPASSWORD} from "../APIConstant";


// export const ActionCreator = {
//     // logins
// }
export const passwordChange =  (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    // console.log(data)
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        apiClient.post('/'+UPDATEPASSWORD, {
            current_password: data.current_password,
            password: data.password,
            password_confirmation: data.password_confirmation,
        }).then(response => {
            console.log(response)
            dispatch(changePassword(data))
        }).catch(error => {
            console.log(error)
            // dispatch(changePassword(data))
        })
    })

    function changePassword (user) {
        return {type : Types.LOGIN , payload : {user} , status : "true"}
    }
}

import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";

export const showData = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
                apiClient.get("/api/systemSetting").then(response => {
                    dispatch(showData(response.data))
                    // console.log(response.data.data)
               })
        }
    })
    function showData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}

export const changeThemes = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.put("/api/systemSetting/"+data.id , {theme : data.theme}).then(response => {
                dispatch(updateData(response.data))
                // console.log(response.data.data)
            })
        }
    })
    function updateData(data){
        return {type : Types.UPDATE , payload : data , status : true}
    }
}
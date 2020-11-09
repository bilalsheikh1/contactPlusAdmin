import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {SYSTEM_STEIING} from "../APIConstant";

export const showTheme = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
                apiClient.get("/api/"+SYSTEM_STEIING).then(response => {
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
            apiClient.put("/api/"+SYSTEM_STEIING+"/"+data.id , {theme : data.theme}).then(response => {
                dispatch(updateData(response.data))
                // console.log(response.data.data)
            })
        }
    })
    function updateData(data){
        return {type : Types.UPDATE , payload : data , status : true}
    }
}

export const createData = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post("/api/"+SYSTEM_STEIING , {server_address : data.server_address , wss_port : data.wss_port , manager_port : data.manager_port , username : data.username , secret : data.secret , connection_timeout : data.connection_timeout , read_timeout : data.read_timeout}).then(response => {
                dispatch(createData(response.data))
                // console.log(response.data.data)
            })
        }
    })
    function createData(data){
        return {type : Types.UPDATE , payload : data , status : true}
    }
}

export const updateData = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.put("/api/"+SYSTEM_STEIING+"/"+data.id , {server_address : data.server_address , wss_port : data.wss_port , manager_port : data.manager_port , username : data.username , secret : data.secret , connection_timeout : data.connection_timeout , read_timeout : data.read_timeout}).then(response => {
                dispatch(updateData(response.data))
                // console.log(response.data.data)
            })
        }
    })
    function updateData(data){
        return {type : Types.UPDATE , payload : data , status : true}
    }
}

export const ShowData = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get("/api/"+SYSTEM_STEIING).then(response => {
                console.log(response.data.data)
                dispatch(ShowData(response.data))
                // console.log(response.data.data)
            })
        }
    })
    function ShowData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}

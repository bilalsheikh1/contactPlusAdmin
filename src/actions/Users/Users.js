import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {USER} from "../APIConstant";


export const UpdateData = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.patch("/api/"+USER+"/update", {username : data.username , name: data.name, email : data.email , type : data.type , id : data.id , queue : data.queue}).then(response => {
                console.log(response.data.success);
                dispatch(updateData(response.data))
            })
        }
    })

    function updateData (data) {
        return {type : Types.UPDATE , payload : data , status : true}
    }
}

export const DeleteData = (data) => (dispatch) => {
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.delete("/api/"+USER+"/"+data.id).then(response => {
                console.log(response.data);
                dispatch(deleteData(response.data))
            })
        }
    })
    function deleteData (data) {
        return {type : Types.DELETE , payload : data , status : true}
    }
}

export const CreateData = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post("/api/"+USER, {username : data.username , name: data.name, email : data.email , type : data.type , auth_username : data.authUserName , auth_password : data.authPassword , password: data.password , password_confirmation : data.confirmPassword , queue : data.queue}).then(response => {
                dispatch(createData(response.data));
            }).catch(error => {
                console.log("catch")
                dispatch(UserError(error.response))
            })
        }
    })

    function createData(data){
        return {type : Types.CREATE , payload : data , status : true}
    }
    function UserError(error){
        return {type : Types.ERROR , payload : error , status : true}
    }
}

export const Registers = (data) => (dispatch) => {

    let token = "";
    console.log(data)
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post("/api/"+USER, {name: data.userName, email : data.email , type : data.type , password: data.password , password_confirmation : data.confirmPassword }).then(response => {
                token = response.data.token;
                if (token != "") {
                    // console.log(dispatch(Register(data)).status)
                    console.log(response)
                    localStorage.setItem("ACCESS_TOKEN", response.data.token);
                }
            })
        }
    })

    function createData(data){
        return {type : Types.DELETE , payload : data , status : true}
    }
}

export const showData = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get("/api/"+USER).then(response => {
                    dispatch(showData(response.data))
                    console.log(response)
            })
        }
    })
    function showData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}
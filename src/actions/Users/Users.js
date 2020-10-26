import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";

export  const GetDataByID =  (record) => (dispatch) => {
    const uri = "https://reqres.in/api/users/"+record.id;
    axios.post(uri).then(response => {
        console.log("dispatched record is ")
        // return dispatch(getData(record));
    })

    function getData (record) {
        return {type : Types.GETDATABYID , payload : record , status : "true"}
    }
    function loginFail (user) {
        return {type : Types.LOGIN_FAILURE , payload : {user}, status : "false" }
    }
}

export const UpdateData = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.patch("/api/person/update", {name: data.name, email : data.email , type : data.type , id : data.id}).then(response => {
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
            apiClient.delete("/api/person/"+data.id).then(response => {
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
            apiClient.post("/api/person", {name: data.name, email : data.email , type : data.type , authUserName : data.authUserName , authPassword : data.authPassword , password: data.password , password_confirmation : data.confirmPassword }).then(response => {
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
            apiClient.post("/api/person", {name: data.userName, email : data.email , type : data.type , password: data.password , password_confirmation : data.confirmPassword }).then(response => {
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
            apiClient.get("/api/person").then(response => {
                    dispatch(showData(response.data))
                    console.log(response)
            })
        }
    })
    function showData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}
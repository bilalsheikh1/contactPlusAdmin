import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {EXTENSION} from "../APIConstant";

export const showData = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get("/api/"+EXTENSION).then(response => {
                dispatch(showData(response.data))
                console.log(response)
            })
        }
    })
    function showData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}

export const UpdateData = (data) => (dispatch) => {
    console.log("update Queues action...")
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.put("/api/"+EXTENSION+"/"+data.id , {context : data.context , exten : data.exten , priority : data.priority , app : data.app , appdata : data.appdata}).then(response => {
                dispatch(updateData(response.data))
                console.log(response)
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
            apiClient.delete("/api/"+EXTENSION+"/"+data.id).then(response => {
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
    console.log("create action...")
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if (response.status === 204 || response.status === 200) {
            apiClient.post("/api/"+EXTENSION, {context : data.context , exten : data.exten , priority : data.priority , app : data.app , appdata : data.appdata}).then(response => {
                dispatch(createData(response.data))
            }).catch(error => {
                dispatch(Error(error.response))
                console.log(error)
            })
        }
    })
    function createData(data){
        return {type : Types.CREATE , payload : data , status : true}
    }
    function Error(data){
        return {type : Types.error , payload : data , status : true}
    }
}
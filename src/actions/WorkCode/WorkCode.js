import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {WORKCODE} from "../APIConstant";

export const UpdateData = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.patch("/api/"+WORKCODE+"/"+data.id, {name: data.name }).then(response => {
                console.log(response.data.status)
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
            // eslint-disable-next-line no-undef
            apiClient.delete("/api/"+WORKCODE+"/"+data.id).then(response => {
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
            console.log(data)
            apiClient.post("/api/"+WORKCODE, { name: data.name }).then(response => {
                console.log(response.data)
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

export const showData = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get("/api/"+WORKCODE).then(response => {
                dispatch(showData(response.data))
                console.log(response.data.data)
            })
        }
    })
    function showData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}
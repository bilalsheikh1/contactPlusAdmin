import {Types} from "../../constants/user.constants";
import {userServices} from "../../services/users.services"
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {IVR} from "../APIConstant";


export const SaveIVR = (name , element) =>  (dispatch) =>
{
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post(IVR , {name: name , script : element}).then(response => {
                dispatch(saveData(response.data))
                console.log(response.data)
            })
        }
    })
    function saveData(data){
        return {type : Types.CREATE , payload : data , status : true}
    }
}

export const GetIVR = () =>  (dispatch) =>
{
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get(IVR).then(response => {
                dispatch(getData(response))
                console.log(response.data)
            })
        }
    })
    function getData(data){
        return {type : Types.SHOWDATA , payload : data , status : true}
    }
}
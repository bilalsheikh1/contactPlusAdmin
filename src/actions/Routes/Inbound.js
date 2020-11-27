import {Types} from "../../constants/user.constants";
import {userServices} from "../../services/users.services"
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {INBOUND, IVR} from "../APIConstant";


export const CreateInbound = (data) =>  (dispatch) =>
{
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.post(INBOUND , {number: data.number , module : data.module}).then(response => {
                dispatch(saveData(response.data))
                console.log(response.data)
            })
        }
    })
    function saveData(data){
        return {type : Types.CREATE , payload : data , status : true}
    }
}

export const UpdateInbound = (data) =>  (dispatch) =>
{
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.put(INBOUND , {number: data.number , module : data.module}).then(response => {
                dispatch(updateData(response.data))
                console.log(response.data)
            })
        }
    })
    function updateData(data){
        return {type : Types.CREATE , payload : data , status : true}
    }
}
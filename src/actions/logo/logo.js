import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";

export const updateLogo = (data) => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            let formData = new FormData();

            formData.append("file", data);
            apiClient.post("/api//1", {_method: 'patch', data:formData  }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }}).then(response => {
                console.log(response.data.success);
                dispatch(updateData(response.data))
            })
        }
    })

    function updateData (data) {
        return {type : Types.UPDATE , payload : data , status : true}
    }
}

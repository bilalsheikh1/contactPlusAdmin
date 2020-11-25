import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {FileUpload} from "../APIConstant";

export const upload = (data) => (dispatch) => {
    console.log(data)
    axios.defaults.withCredentials = true;
    let formData = new FormData();
    formData.append("fileName", data);
    console.log(formData)
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get("/api/"+FileUpload , {fileName: data.File}, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(response => {
                dispatch(uploadFile(response.data))
                console.log(response)
            })
        }
    })
    function uploadFile(data){
        return {type : Types.UPLOAD , payload : data , status : true}
    }
}
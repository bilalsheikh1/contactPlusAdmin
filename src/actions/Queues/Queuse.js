import {Types} from "../../constants/user.constants";
import * as axios from "axios";
import React, {useState} from 'react';
import apiClient from "../../axios/axios";
import {QUEUE} from "../APIConstant";


// export const ActionCreator = {
//     // logins
// }

// export  const GetDataByID =  (record) => (dispatch) => {
//     console.log(dispatch(loading()).type);
//     let token = "";
//     console.log("GetData...");
//     // console.log(record.id);
//     // return function (dispatch , user) {
//     const uri = "https://reqres.in/api/users/"+record.id;
//     axios.post(uri).then(response => {
//         // token = response.data.token;
//         // if(token != "") {
//         console.log("dispatched record is ")
//         return dispatch(getData(record));
//         // localStorage.setItem("ACCESS_TOKEN" , response.data.token);
//         // }    `1
//         // else
//         //     dispatch(loginFail(user).status)
//     })
//
//     function loading () {
//         return {type : Types.LOADING }
//     }
//     function getData (record) {
//         return {type : Types.GETDATABYID , payload : record , status : "true"}
//     }
//     function loginFail (user) {
//         return {type : Types.LOGIN_FAILURE , payload : {user}, status : "false" }
//     }
// }

export const showData = () => (dispatch) => {
    axios.defaults.withCredentials = true;
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204 || response.status === 200)
        {
            apiClient.get("/api/"+QUEUE).then(response => {
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
            apiClient.put("/api/"+QUEUE+"/"+data.oldName , { name : data.name}).then(response => {
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
            apiClient.delete("/api/"+QUEUE+"/"+data.name).then(response => {
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
            apiClient.post("/api/"+QUEUE, {data: data}).then(response => {
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
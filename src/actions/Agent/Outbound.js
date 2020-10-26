import {Types} from "../../constants/user.constants";
// import {userServices} from "../../services/users.services"
import * as axios from "axios";
import React, {useState} from 'react';


// export const ActionCreator = {
//     // logins
// }

export  const GetDataByID =  (record) => (dispatch) => {
    console.log(dispatch(loading()).type);
    let token = "";
    console.log("GetData...");
    // console.log(record.id);
    // return function (dispatch , user) {
    const uri = "https://reqres.in/api/users/"+record.id;
    axios.post(uri).then(response => {
        // token = response.data.token;
        // if(token != "") {
        console.log("dispatched record is ")
        return dispatch(getData(record));
        // localStorage.setItem("ACCESS_TOKEN" , response.data.token);
        // }    `1
        // else
        //     dispatch(loginFail(user).status)
    })

    function loading () {
        return {type : Types.LOADING }
    }
    function getData (record) {
        return {type : Types.GETDATABYID , payload : record , status : "true"}
    }
    function loginFail (user) {
        return {type : Types.LOGIN_FAILURE , payload : {user}, status : "false" }
    }
}

export const UpdateData = (data) => (dispatch) => {

    console.log(dispatch(loading()).type)
    console.log(data.firstName)
    console.log("update action...")
    // use id for update data.id
    // axios.put("" , {firstName : data.firstName , lastName : data.lastName , email : data.email}).then (response => {
    //         if(response.data.status == 0)
    //           dispatch(updateData(data)
    //         else
    //           return response.data.message +" failed to update"
    // })

    function loading () {
        return {type : Types.LOADING }
    }
    function updateData (data) {
        return {type : Types.UPDATE , payload : data , status : true}
    }
}

export const DeleteData = (data) => (dispatch) => {

    console.log(dispatch(loading()).type)
    console.log(data.firstName)
    console.log("delete action...")

    // use id for delete data.id
    // axios.put("" , {firstName : data.firstName , lastName : data.lastName , email : data.email }).then (response => {
    //         if(response.data.status == 0)
    //           dispatch(deleteData(data)
    //         else
    //           return response.data.message +" failed to update"
    // })

    function loading () {
        return {type : Types.LOADING }
    }
    function deleteData (data) {
        return {type : Types.DELETE , payload : data , status : true}
    }
}

export const CreateData = (data) => (dispatch) => {

    console.log(dispatch(loading()).type)
    console.log(data.firstName)
    console.log("create action...")

    // axios.put("" , {firstName : data.firstName , lastName : data.lastName , email : data.email}).then (response => {
    //         if(response.data.status == 0)
    //           dispatch(createData(data)
    //         else
    //           return response.data.message +" failed to update"
    // })

    function loading () {
        return {type : Types.LOADING }
    }
    function createData(data){
        return {type : Types.DELETE , payload : data , status : true}
    }
}
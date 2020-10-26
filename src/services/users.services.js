import React, {useState} from "react";


const Login = (username , password) => {

    const {result , setResult} = useState("");

    //Use Axios Here for AUTH and return User object

    if(username == "admin" && password == "admin")
    {
        console.log("success");
        setResult("success");
        return result;
    }
    else
    {
        console.log("failed");
        setResult("Failed");
        return result
    }



}

export default Login;
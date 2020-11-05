import React, {useEffect, useState} from "react";
import apiClient from "../axios/axios";

export const Theme = () => {
    let changeTheme = "";
    const [themes , setTheme] = useState()
        useEffect( () => {
             apiClient.get('/sanctum/csrf-cookie').then(response => {
                if (response.status === 204 || response.status === 200) {
                    apiClient.get("/api/systemSetting").then(response => {
                        console.log(response.data.data[0].theme)
                        changeTheme = response.data.data[0].theme;
                        setTheme(response.data.data[0].theme)
                    })
                }
            }).catch(error => {
                changeTheme = "dark"
            })
        },[])

    console.log(themes)
    return  themes;
}

export const themeUpdate =  (theme) => {
    let changeTheme = "";
console.log(theme)
    apiClient.get('/sanctum/csrf-cookie').then(response => {
        if (response.status === 204 || response.status === 200) {
            apiClient.put("/api/systemSetting/1" ,{theme : theme}).then(response => {
                if(response.data.status == 1) {
                    changeTheme = theme=='dark' ? 'light' : 'dark'
                }
                // changeTheme = response.data.;
                // setTheme(response.data.data[0].theme)
            })
        }
    }).catch(error => {
        changeTheme = "dark"
    })
    console.log(changeTheme)
    return changeTheme;
}


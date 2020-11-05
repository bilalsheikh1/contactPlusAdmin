import {Types} from "../constants/user.constants";

const initState = {
    systemSetting : {
        theme : '',
        id : ''
        // confirm_password : '',
    },
    formSubmitted : false ,
    error : '',
    type : "",
    loading : "",
    status : ''
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        // case Types.GETDATABYID :
        //     return {
        //         ...state,
        //         RoutesOutbound: action.payload.RoutesOutbound,
        //         status : action.status,
        //         formSubmitted : false
        //     }
        case Types.UPDATE :
            return {
                ...state,
                status: action.payload.status,
                formSubmitted: false,
                type: "update",
            }
        case Types.CREATE :
            return {
                ...state,
                status: action.payload,
                formSubmitted: false ,
                error: action.payload.error,
                type: "createData"
            }
        case Types.DELETE :
            return {
                ...state,
                status: action.payload.status,
                formSubmitted: false,
                type: "delete"
            }
        case Types.LOADING :
            return {
                ...state,
                loading: "loadding",
                formSubmitted: false,
            }
        case Types.SHOWDATA :
            return {
                ...state,
                systemSetting: action.payload.data[0],
                formSubmitted: false,
                type: "showTheme"
            }
        case Types.ERROR :
            return {
                ...state,
                error: action.payload.error,
                formSubmitted : false,
            }
        // case Types.LOGIN_FAILURE :
        //     return {
        //         ...state,
        //         profile: action.payload.user,
        //         status : action.status,
        //         formSubmitted : false,
        //     }
        default :
            return state;
    }
}

export default reducer;
import {Types} from "../constants/user.constants";

const initState = {
    Users : {
        name : '',
        type : '',
        email : '',
        id : ''
        // confirm_password : '',
    },
    formSubmitted : false ,
    error : '',
    type : "",
    loading : "",
    status : '',
    isLogin: false
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
                status: action.payload.success,
                formSubmitted: false,
                type: "update",
            }
        case Types.CREATE :
            return {
                ...state,
                Users: action.payload,
                formSubmitted: false ,
                error: action.payload.error,
                type: "createData"
            }
        case Types.DELETE :
            console.log(action.payload.status)
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
                Users: action.payload.data,
                formSubmitted: false,
                type: "showData"
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
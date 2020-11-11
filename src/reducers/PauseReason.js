import {Types} from "../constants/user.constants";

const initState = {
    PauseReason : {
        name : '',
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

        case Types.UPDATE :
            return {
                ...state,
                status: action.payload.status,
                formSubmitted: false,
                type: "update",
            }
        case Types.CREATE :
            console.log(action.payload)
            return {
                ...state,
                // PauseReason: action.payload,
                formSubmitted: false ,
                error: action.payload.error,
                type: "createData",
                status: action.payload.status,
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
            console.log(action.payload.data)
            return {
                ...state,
                PauseReason: action.payload.data,
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
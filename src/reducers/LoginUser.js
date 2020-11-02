import {Types} from "../constants/user.constants";

const initState = {
    user : {
        username : '',
        email : '',
        password : '',
        confirm_password : '',
        status : ''
    },
    formSubmitted : false,
    type : ''
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        case Types.LOGIN :
            return {
                ...state,
                user: action.payload.user,
                status : action.status,
                formSubmitted : false,
                type : "LoginSuccess"
            }
        case Types.LOADING :
            return {
                ...state,
                user: action.payload+"loadding",
                formSubmitted: false,
            }
        case Types.REGISTER :
            return {
                ...state,
                user: action.payload.user,
                formSubmitted : false,
            }
        case Types.LOGIN_FAILURE :
            return {
                ...state,
                user: action.payload.user,
                status : action.status,
                formSubmitted : false,
                type : "LoginFail"
            }
        default :
            return state;
    }
}

export default reducer;
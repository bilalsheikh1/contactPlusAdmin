import {Types} from "../constants/user.constants";

const initState = {
    profile : {
        username : '',
        email : '',
        password : '',
        confirm_password : '',
        status : ''
    },
    formSubmitted : false
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        case Types.LOGIN :
            return {
                ...state,
                profile: action.payload.user,
                status : action.status,
                formSubmitted : false
            }
        case Types.LOADING :
            return {
                ...state,
                profile: action.payload+"loadding",
                formSubmitted: false,
            }
        case Types.REGISTER :
            return {
                ...state,
                profile: action.payload.user,
                formSubmitted : false,
            }
        case Types.LOGIN_FAILURE :
            return {
                ...state,
                profile: action.payload.user,
                status : action.status,
                formSubmitted : false,
            }
        default :
            return state;
    }
}

export default reducer;
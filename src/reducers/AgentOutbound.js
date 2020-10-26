import {Types} from "../constants/user.constants";

const initState = {
    AgentOutbound : {
        first_name : '',
        last_name : '',
        email : '',
        // confirm_password : '',
        status : ''
    },
    formSubmitted : false
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        // case Types.GETDATABYID :
        //     return {
        //         ...state,
        //         AgentOutbound: action.payload.AgentOutbound,
        //         status : action.status,
        //         formSubmitted : false
        //     }
        case Types.UPDATE :
            return {
                ...state,
                AgentOutbound: action.payload.data,
                formSubmitted: false
            }
        case Types.CREATE :
            return {
                ...state,
                AgentOutbound: action.payload.data,
                formSubmitted: false
            }
        case Types.DELETE :
            return {
                ...state,
                AgentOutbound: action.payload.data,
                formSubmitted: false
            }
        case Types.LOADING :
            return {
                ...state,
                profile: action.payload+"loadding",
                formSubmitted: false,
            }
        // case Types.REGISTER :
        //     return {
        //         ...state,
        //         profile: action.payload.user,
        //         formSubmitted : false,
        //     }
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
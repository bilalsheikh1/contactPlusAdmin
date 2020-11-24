import {Types} from "../constants/user.constants";

const initState = {
    IVR: {
        name : "",
        script : ""
    },
    formSubmitted : false,
    status : 0
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        case Types.UPDATE :
            return {
                ...state,
                RoutesInbound : action.payload.data,
                formSubmitted: false
            }
        case Types.CREATE :
            console.log(action.payload)
            return {
                ...state,
                IVR: action.payload.status,
                formSubmitted: false,
                status: action.payload.status
            }
        case Types.DELETE :
            return {
                ...state,
                RoutesInbound: action.payload.data,
                formSubmitted: false
            }
        case Types.LOADING :
            return {
                ...state,
                profile: action.payload+"loadding",
                formSubmitted: false,
            }
        default :
            return state;
    }
}

export default reducer;
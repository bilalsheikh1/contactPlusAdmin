import {Types} from "../constants/user.constants";

const initState = {
    IVR: {
        number : "",
        module : ""
    },
    formSubmitted : false,
    status : 0,
    error : '',
    type : "",
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        case Types.UPDATE :
            return {
                ...state,
                IVR : action.payload.data,
                formSubmitted: false,
                type: "updateData"
            }
        case Types.CREATE :
            console.log(action.payload)
            return {
                ...state,
                IVR: action.payload.status,
                formSubmitted: false,
                status: action.payload.status,
                type: "createData"
            }
        case Types.DELETE :
            return {
                ...state,
                IVR: action.payload.data,
                formSubmitted: false,
                type: "deleteData"
            }
        case Types.SHOWDATA :
            return {
                ...state,
                IVR: action.payload.data,
                formSubmitted: false,
                type: "showData"
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
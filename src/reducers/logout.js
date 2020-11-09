import {Types} from "../constants/user.constants";

const initState = {
    loggedIn: localStorage.getItem("loggedIn")=== true ? true : false ,
    formSubmitted : false ,
    error : '',
    type : "",
    loading : "",
    status : ''
}

const reducer =  (state = initState , action) => {
    switch (action.type){
        case Types.LOGOUT :
            return {
                ...state,
                status: action.payload,
                formSubmitted: false,
                type: "update",
            }
        default :
            return state;
    }
}

export default reducer;
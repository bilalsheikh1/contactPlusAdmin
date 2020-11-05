import {Types} from "../constants/user.constants";

const initState = {
    logout:  {
       // status
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
        case Types.LOGOUT :
            console.log(action.payload)
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
import {UserActionType, FETCH_USER_ACTION} from "../types/getUserType";


let initialState = {
    user:{}
}

function fetchUserReducer(state = initialState, action:FETCH_USER_ACTION){
    switch(action.type){
        case UserActionType.USER_SUCCESS:
            return{
                user:action.payload
            }
            default:
                return state;
    }

}

export default fetchUserReducer;
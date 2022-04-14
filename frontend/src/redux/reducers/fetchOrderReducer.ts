import {OrderActionType, FETCH_ORDER_ACTION} from "../types/getOrdersTypes";


let initialState = {
    myorders:[]
}

function fetchOrderReducer(state = initialState, action:FETCH_ORDER_ACTION){
    switch(action.type){
        case OrderActionType.ORDER_SUCCESS:
            return{
                myorders:action.payload
            }
            default:
            return state;
    }
}

export default fetchOrderReducer;
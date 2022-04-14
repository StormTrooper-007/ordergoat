import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import fetchUserReducer from "./reducers/fetchUserReducer";
import fetchOrderReducer from "./reducers/fetchOrderReducer";



export const composeEnhancer =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    user:fetchUserReducer,
    myorders:fetchOrderReducer
});



const store = createStore(reducers,composeEnhancer(applyMiddleware(thunk)));

export default store;

export type rootState = ReturnType<typeof reducers>;
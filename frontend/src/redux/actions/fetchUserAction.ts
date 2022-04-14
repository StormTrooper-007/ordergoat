import axios from "axios"
import { Dispatch } from "redux";
import { UserActionType } from "../types/getUserType";


export function fetchUser(){
    return async (dispatch: Dispatch) => {
        const res = await axios.get("http://localhost:3004/api/v1/users/user", { withCredentials:true });
        const user=  await res.data
        dispatch({ type: UserActionType.USER_SUCCESS, payload:user});
      };
}
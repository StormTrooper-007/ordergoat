export interface IUser{
    username:string,
    isAdmin:boolean
}

export interface IState{
    user:IUser
}

export enum UserActionType {
    USER_SUCCESS = "USER_SUCCESS",
  }

export interface API_SUCCESS{
    type:UserActionType.USER_SUCCESS,
    payload:IUser
}

export type FETCH_USER_ACTION = API_SUCCESS;
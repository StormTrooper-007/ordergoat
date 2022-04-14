


export enum OrderActionType {
    ORDER_SUCCESS = "ORDER_SUCCESS",
}

export interface ORDER_API_SUCCESS{
    type:OrderActionType.ORDER_SUCCESS;
    payload:any;
}

export type FETCH_ORDER_ACTION = ORDER_API_SUCCESS;
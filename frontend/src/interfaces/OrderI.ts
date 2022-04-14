import { OrderItemI } from "./OrderItemI";

export interface OrderI {
    name:string,
    image:string,
    price:number,
    section:string
    notes?:string,
    table?:string,
    quantity?:number,
}
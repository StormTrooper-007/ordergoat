import { useState } from "react";
//import { OrderI } from "../interfaces/OrderI";


export function useOrder(){
    const [orders, setOrders] = useState<any[]>([]);
    return(
        {orders, setOrders}
    )
}




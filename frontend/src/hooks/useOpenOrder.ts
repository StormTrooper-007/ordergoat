import {useState} from 'react';
import { OrderItemI } from '../interfaces/OrderItemI';

export function useOpenOrder(){
    const [openOrder, setOpenOrder] = useState<any>();
    return(
        {openOrder, setOpenOrder}
    )
}
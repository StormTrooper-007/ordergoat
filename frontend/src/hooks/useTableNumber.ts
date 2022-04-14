import {useState} from 'react';

export function useTableNumber(){
    const [tableNumber, setTableNumber] = useState<number>(301);
    return(
        {tableNumber, setTableNumber}
    )
}
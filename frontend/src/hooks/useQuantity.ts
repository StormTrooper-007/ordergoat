import {useState} from 'react';


export function useQuantity(){
    const [quantity, setQuantity] = useState<number>(1);
    function increment(){
        setQuantity(prev => prev + 1);
    }

    function decrement(){
        setQuantity(prev => prev - 1);
    }

    function resetQuantity(){
        setQuantity(1);
    }
    function increaseBy(value:number){
        setQuantity(quantity*value);
    }
    function decreaseBy(value:number){
        setQuantity(quantity*value);
    }
    return(
        {     quantity,
             setQuantity,
              increment,
              decrement,
              resetQuantity,
               increaseBy, 
               decreaseBy}
    )
}
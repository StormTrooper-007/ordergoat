import "../sass/myorders.scss";
import { Sidebar } from "../components/Sidebar";
import { Shadow } from "../components/Shadow";
import {formatPrice} from "../data/orderData";

type Props = {
  myorders: any;
  off: boolean;
  handleSwitch: () => void;
};

export function MyOrders({ myorders, off, handleSwitch }: Props) {
  function getArr(arr: any) {
    const temp: any = [];
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i].orders);
    }
    return temp;
  };

function calcTotal(price:any, quantity:any){
  let sum:any = 0;
  let re = price*quantity;
  sum+=re;
  return sum;
}

  return(
    <>
    {off && <Sidebar handleSwitch={handleSwitch} />}
    {off && <Shadow handleSwitch={handleSwitch} />}
    <div className="myorders__container">
      <h2>Orders History</h2>
      <ul className="myorders__list">
       {Object.keys(getArr(myorders)).map((key) => {
         return (
           <div key = {key}>
             <h1> Order {""} {Number(key) + 1} </h1>
             {getArr(myorders)[key].map((item:any, index:number) => {
               return(
              <div key={index+1}>
                <div className="myorders__list__row">
                <span>{index + 1}.</span>
                <li>Order name: {item.name} </li>
                <li>Price: {formatPrice(item.price)}</li>
                <li> Quantity: {item.quantity}</li>
                <li>Notes: {item.notes} </li>
                <li> TableNo: {item.table} </li>
                <li> Item Id: {item._id} </li>
                <li> date: {item.day} </li>
                <li> time: {item.time} </li>
                <li> Total: {formatPrice(item.quantity * item.price)} </li>
                </div>
              </div>)
             })}
           </div>
         )
       })}
      </ul>
    </div>
  </>
  )
}

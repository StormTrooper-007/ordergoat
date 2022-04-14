import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { rootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { orderData } from "../data/orderData";
import { OrderItemI } from "../interfaces/OrderItemI";
import "../sass/home.scss";
import { CardItem } from "../components/CardItem";
import { Shadow } from "../components/Shadow";
import { DialogShadow } from "../components/DialogShadow";
import { Sidebar } from "../components/Sidebar";
import { DialogBox } from "../components/DialogBox";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { OrderI } from "../interfaces/OrderI";
import Button from "@mui/material/Button";
import { formatPrice } from "../data/orderData";

type Props = {
  off: boolean;
  setOff: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwitch: () => void;
  openOrder: any;
  setOpenOrder: React.Dispatch<React.SetStateAction<any>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  increment: () => void;
  decrement: () => void;
  resetQuantity: () => void;
  increaseBy: (value: number) => void;
  decreaseBy: (value: number) => void;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  tableNumber: number;
  orders: any;
  setOrders: React.Dispatch<React.SetStateAction<any>>;
};
export function Home({
  off,
  handleSwitch,
  setOpenOrder,
  openOrder,
  quantity,
  setQuantity,
  increment,
  decrement,
  resetQuantity,
  notes,
  setNotes,
  tableNumber,
  orders,
  setOrders,
}: Props) {
  
  
  
const { user } = useSelector((state: rootState) => state.user);

  
  async function postOrder() {
    const req = {
      orders: [...orders],
    };
    try {
      const res = await axios.post("http://localhost:3004/api/v1/orders", req, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  function orderdialogSwitch() {
    setOpenOrder(!openOrder);
  }

  const navigate = useNavigate();

  function addToOrder() {
    const date = new Date();
    const day = date.toDateString();
    const time = date.toLocaleTimeString();
    const order = {
      ...openOrder,
      quantity,
      notes,
      table: tableNumber,
      day,
      time,
    };
    setOrders(orders.concat(order));
    setOpenOrder(null);
    setNotes("");
    setQuantity(1);
    console.log(orders);
  }

  function calcPrice(quantity: number, price: number) {
    const result = quantity * price;
    return result;
  }

  function totalPrice(arr: any): number {
    let totalPrice: number = 0;
    arr.map(function (item: any) {
      totalPrice += item.quantity * item.price;
      return totalPrice;
    });
    return totalPrice;
  }

  function deleteOrder(index: any) {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  }

  return (
    <>
      {off && <Sidebar handleSwitch={handleSwitch} />}
      {off && <Shadow handleSwitch={handleSwitch} />}
      {openOrder && (
        <DialogShadow
          setOpenOrder={setOpenOrder}
          orderdialogSwitch={orderdialogSwitch}
        />
      )}
      {openOrder && (
        <DialogBox
          openOrder={openOrder}
          setOpenOrder={setOpenOrder}
          quantity={quantity}
          increment={increment}
          decrement={decrement}
          resetQuantity={resetQuantity}
          notes={notes}
          setNotes={setNotes}
          tableNumber={tableNumber}
          addToOrder={addToOrder}
          orders={orders}
        />
      )}
      <div className="home__container">
        <div className="home__foodgrid">
          {orderData?.map((item: OrderItemI, index: number) => (
            <CardItem item={item} key={index + 1} setOpenOrder={setOpenOrder} />
          ))}
        </div>
        <div className="home__order__list">
          <h2>Orders</h2>
          <div className="home__order__list__row__container">
            {orders.length === 0 ? (
              <div>You dont have any orders at the moment</div>
            ) : null}
            {orders?.map((order: any, index: number) => (
              <div key={index + 1}>
                <div className="home__order__row">
                  <div id="name">name:{order.name}</div>
                  <div onClick={deleteOrder}>
                    <DeleteTwoToneIcon style={{ color: "red" }} />
                  </div>
                </div>
                <div id="delete">
                  price:{formatPrice(calcPrice(order.quantity, order.price))}
                </div>
                <div>{order.day}</div>
                <div>{order.time}</div>
              </div>
            ))}
          </div>
          <h2>Total Price</h2>
          <h2>{formatPrice(totalPrice(orders))}</h2>
          <Button
            variant="contained"
            style={{ marginLeft: 65 }}
            onClick={postOrder}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

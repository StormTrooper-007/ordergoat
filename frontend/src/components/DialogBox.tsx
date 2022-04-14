import "../sass/dialogbox.scss";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import IndeterminateCheckBoxTwoToneIcon from '@mui/icons-material/IndeterminateCheckBoxTwoTone';
import Button from '@mui/material/Button';
import {TextArea} from "../components/TextArea";
import {useOrder} from '../hooks/useOrder';
import {OrderI} from "../interfaces/OrderI";
import { useState } from "react";


type Props = {
  openOrder:any;
  setOpenOrder:React.Dispatch<React.SetStateAction<any>>
  quantity:number
  increment: () => void;
  decrement: () => void;
  resetQuantity: () => void;
  notes:string
  setNotes:React.Dispatch<React.SetStateAction<string>>
  tableNumber:number
  orders:any
  addToOrder: () => void
}

export function DialogBox({openOrder,setOpenOrder,quantity,increment,decrement,resetQuantity,notes,setNotes,tableNumber, orders, addToOrder}: Props){
  return (
    <section className="dialog__container">
        <img src={openOrder.image} alt={openOrder.name}/>
        <main>
          <div className="quantity__container">
          <div id={quantity === 1 ? "minus":""} onClick={decrement}>
              <IndeterminateCheckBoxTwoToneIcon/>
           </div>
            <div id="quantity" >
              {quantity}
            </div>
            <div id="add" onClick={increment}>
              <AddBoxTwoToneIcon/>
            </div>
          </div>
          <div style={{marginLeft:91, marginTop:20, alignItems:"center"}}>
          <TextArea notes={notes} setNotes={setNotes}/>
          </div>
        </main>
        <footer>
        <Button variant="contained" style={{marginLeft:125}} onClick={addToOrder}>Add order</Button>
        </footer>
    </section>
  )
}



import { Request, Response, NextFunction } from 'express';
import Order, { OrderDoc } from "../models/Order";
import { OrderInterface } from 'src/interfaces/OrderInterface';


async function create(order:OrderDoc):Promise<OrderDoc>{
    return order.save()
}

const deleteById = async (orderId: string): Promise<OrderDoc | null> => {
    const foundOrder = Order.findByIdAndDelete(orderId)
    if (!foundOrder) {
      console.log(`Order ${orderId} not found`);
    }
    return foundOrder;
  }

export async function createOrder(req:Request, res:Response, next:NextFunction){
    try{
        const {orders} = req.body
        const order = new Order({
           orders
        })
        await create(order);
        res.send(order);
    }catch(e){
        console.log(e);
    }
}

export async function deleteOrder (req: Request, res: Response, next: NextFunction){
    try {
      await deleteById(req.params.movieId);
      res.send("order deleted");
    } catch (e) {
        console.log(e);
    }
}
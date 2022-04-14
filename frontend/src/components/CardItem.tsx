import "../sass/carditem.scss";
import {motion} from "framer-motion";
import {formatPrice} from "../data/orderData";

type Props = {
    item:any
    setOpenOrder:React.Dispatch<React.SetStateAction<any>>
}

export function CardItem({item, setOpenOrder}: Props) {
  function openDialog(){
    setOpenOrder(item)
  }
  return (
    <motion.div className="card__item__container" whileHover={{scale:1.1, transition: { duration: 0.2 }}} onClick={openDialog}>
        <img src={item.image} alt={item.name}/>
        <p>Name: {item.name}</p>
        <p>Price: {formatPrice(item.price)}</p>
    </motion.div>
  )
}


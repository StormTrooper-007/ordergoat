import { OrderItemI } from "../interfaces/OrderItemI"

export function formatPrice(price:number){
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency:'EUR'
    })
}

export const orderData:OrderItemI[] = [
    {
        name:"Anh Nguyen salad",
        image:"/images/anhnguyensalad.jpg",
        price:10.00,
        section:"salad"

    },
    {
        name:"Aperol spritz",
        image:"/images/aperolspritz.jpg",
        price:9.45,
        section:"drinks"
    },
    {
        name:"Burger",
        image:"/images/burger.jpg",
        price:8.45,
        section:"food"
    },
    {
        name:"capuccino",
        image:"/images/capuccino.jpg",
        price:4.45,
        section:"drinks"
    },
    {
        name:"Chad Montano Pizza",
        image:"/images/chadmontanopizza.jpg",
        price:12.35,
        section:"food"
    },
    {
        name:"Cheese Pasta",
        image:"/images/cheesepasta.jpg",
        price:11.45,
        section:"food"
    },
    {
        name:"Cola",
        image:"/images/cola.jpg",
        price:4.00,
        section:"drinks"
    },
    {
        name:"Expresso",
        image:"/images/expresso.jpg",
        price:3.45,
        section:"drinks"
    },
    {
        name:"Gonzalez Bread",
        image:"/images/gonzalezbread.jpg",
        price:7.95,
        section:"food"
    },
    {
        name:"Honey Loafs",
        image:"/images/honeyloafs.jpg",
        price:7.45,
        section:"food"
    },
    {
        name:"Hugo",
        image:"/images/hugo.jpg",
        price:9.45,
        section:"drinks"
    },
    {
        name:"Penne Ariabiata",
        image:"/images/pennearabiata.jpg",
        price:8.05,
        section:"food"
    },
    {
        name:"Saundary Pizza",
        image:"/images/saundaryasrinivasanpizza.jpg",
        price:8.05,
        section:"food"
    },
    {
        name:"Water",
        image:"/images/water.jpg",
        price:5.00,
        section:"drinks"
    },
    {
        name:"Iced tea",
        image:"/images/icedtea.jpg",
        price:10.00,
        section:"drinks"
    },
]
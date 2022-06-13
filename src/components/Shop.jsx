import {useState, useEffect} from 'react'
import { API_URL, API_KEY } from '../config';

import GoodsList from './GoodsList';
import Preloader from './Preloader';
import Cart from './Cart';
import BasketList from './BasketList';
import Alert from './Alert';

function Shop() {
const [goods, setGoods] = useState([]);
const [loading, setLoading] = useState(true)
const [order, setOrder] = useState([])
const [isBasketShow, setIsBasketShow] = useState(false)
const [alertName, setAlertName] = useState('')

const addToBasket = (item) =>{
    const itemIdx = order.findIndex(orderItem => orderItem.id === item.id)

    if(itemIdx < 0){
        const newItem = {
            ...item, 
            quantity: 1
        }
        setOrder([...order, newItem])
    }else{
        const newOrder = order.map((item, idx) =>{
            if(idx === itemIdx){
                return {...item, quantity: item.quantity + 1}
            }else{
                return item
            }
        })
        setOrder(newOrder)
    }
    setAlertName(item.name)
}

const incQuantity = (itemId) =>{
    const newOrder = order.map((item) => {
        if(itemId === item.id){
            const newQuantity = item.quantity + 1
            return {
                ...item,
                quantity: newQuantity
            }
        } else{
            return item
        }
    })
    setOrder(newOrder)
}

const decQuantity = (itemId) =>{
    const newOrder = order.map((item) => {
        if(itemId === item.id){
            const newQuantity = item.quantity - 1
            return {
                ...item,
                quantity: newQuantity > 0? newQuantity : 0
            }
        } else{
            return item
        }
    })
    setOrder(newOrder)
}

const removeFromBasket = (id) => {
    const newOrder = order.filter(item => item.id !== id)
    setOrder(newOrder) 
}

const handleBasketShow = () =>{
    setIsBasketShow(!isBasketShow)
}

const closeAlert = () =>{
    setAlertName('');
}

useEffect(function getGoods(){

    fetch(API_URL, {
        headers: {
            'Authorization': API_KEY
        },
    })
    .then(res=>res.json())
    .then(data=>{
        data.featured && setGoods(data.featured)
        setLoading(false)
    })

},[])

    return <main className="container content">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
        {
            loading? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket}/>
        }
        {isBasketShow &&
            (<BasketList 
                order={order} 
                handleBasketShow={handleBasketShow} 
                removeFromBasket={removeFromBasket}
                incQuantity={incQuantity}
                decQuantity={decQuantity}
            />)}
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert}/>
        }
    </main>
}

export default Shop;
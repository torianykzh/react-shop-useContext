import { useContext } from "react";
import { ShopContext } from "../context";
import BasketItem from "./BasketItem";

function BasketList(){
    const {
        order = [],
        handleBasketShow = Function.prototype,
    } = useContext(ShopContext)

    const total_price = order.reduce((sum, item) => sum + item.price*item.quantity,0)

    return(
        <ul className="collection basket-list">
            <li className="collection-item active">Корзина
                <span className="secondary-content cursor-pointer" onClick={() => handleBasketShow()}>
                    <i className="material-icons">
                        close
                    </i>
                </span>
            </li>
                {order.length?order.map(item => 
                    <BasketItem key={item.id} item={item}/>) 
                : <li className="collection-item">Корзина пуста</li>}
            <li  className="collection-item active">Общая стоимость: {total_price}
            <span className="secondary-content btn-small">Оформить заказ</span>
            </li>
        </ul>
    )
}

export default BasketList;
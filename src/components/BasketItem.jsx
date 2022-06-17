import { useContext } from "react";
import { ShopContext } from "../context";

function BasketItem(props){
    const {
        id,
        name,
        price,
        quantity,
    } = props.item

    const { removeFromBasket, incQuantity, decQuantity } = useContext(ShopContext)
    return(
        <li  className="collection-item">
            {name} x{quantity} = {price*quantity}
            <span className="secondary-content" onClick={() => removeFromBasket(id)}>
                <i className="material-icons cursor-pointer">
                    delete
                </i>
            </span>
            <span className="secondary-content" onClick={() => incQuantity(id)}>
                <i className="material-icons cursor-pointer">
                    add
                </i>
            </span>
            <span className="secondary-content" onClick={() => decQuantity(id)}>
                <i className="material-icons cursor-pointer">
                    remove
                </i>
            </span>
        </li>
    )
}

export default BasketItem;
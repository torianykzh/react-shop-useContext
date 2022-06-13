function BasketItem(props){
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props

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
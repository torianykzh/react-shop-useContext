import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const ShopContext = createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    alertName: '',
}

export const ContextProvider = ({children}) => {
    const [value, disptach] = useReducer(reducer, initialState)

    value.closeAlert = () => {
        disptach({type: 'CLOSE_ALERT'})
    }

    value.removeFromBasket = (itemId) => {
        disptach({type: 'REMOVE_FROM_BASKET', payload: {id: itemId}})
    }

    value.addToBasket = (item) =>{
        disptach({type: 'ADD_TO_BASKET', payload: item})
    }

    value.incQuantity = (itemId) =>{
        disptach({type: 'INC_QUANTITY', payload: {id: itemId}})
    }

    value.decQuantity = (itemId) =>{
        disptach({type: 'DEC_QUANTITY', payload: {id: itemId}})
    }

    value.handleBasketShow = () =>{
        disptach({type: 'TOGGLE_BASKET'})
    }

    value.setGoods = (data) =>{
        disptach({type: 'SET_GOODS', payload: data})
    }

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    )
}
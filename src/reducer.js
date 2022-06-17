export function reducer(state, {type, payload}){
    switch(type){
        case 'SET_GOODS':{
            return{
                ...state,
                goods: payload || [],
                loading: false,
            }
        }
        case 'TOGGLE_BASKET':
            return{
                ...state,
                isBasketShow: !state.isBasketShow
            }
        case 'INC_QUANTITY':
            return {
                ...state,
                order: state.order.map((item) => {
                    if(payload.id === item.id){
                        const newQuantity = item.quantity + 1
                        return {
                            ...item,
                            quantity: newQuantity
                        }
                    } else{
                        return item
                    }
                })
            }
        case 'DEC_QUANTITY':
            return {
                ...state,
                order: state.order.map((item) => {
                    if(payload.id === item.id){
                        const newQuantity = item.quantity - 1
                        return {
                            ...item,
                            quantity: newQuantity > 0? newQuantity : 0
                        }
                    } else{
                        return item
                    }
                })
            }
        case 'ADD_TO_BASKET':
            {
                console.log(payload)
                const itemIdx = state.order.findIndex(orderItem => orderItem.id === payload.id)
                let newOrder = null
                if(itemIdx < 0){
                    const newItem = {
                        ...payload,
                        quantity: 1
                    }
                    newOrder = [...state.order, newItem]
                }else{
                    newOrder = state.order.map((item, idx) =>{
                        if(idx === itemIdx){
                            return {...item, quantity: item.quantity + 1}
                        }else{
                            return item
                        }
                    })
                }
// 
                return {
                    ...state,
                    order: newOrder,
                    alertName: payload.name
                }
            }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state, 
                order: state.order.filter((el) => el.id !== payload.id)
            }
        case 'CLOSE_ALERT':
            return {
                ...state, 
                alertName: ''
            }
        default: return state;
    }
}
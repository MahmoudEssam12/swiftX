export const setCart = (payload) => {
    return {
        type: "ADD_TO_CART",
        payload: payload
    }
}

export const updateCartProduct = (payload) => {
    return {
        type: "UPDATE_CART_PRODUCT",
        payload
    }
}

export const setCartEmpty = (payload) => {
    return {
        type: "SET_CART_EMPTY",
        payload: payload
    }
}

export const increaseQuantityItem = (payload) => {
    return {
        type: "INCREASE_QUANTITY_ITEM",
        payload
    }
}
export const decreaseQuantityItem = (payload) => {
    return {
        type: "DECREASE_QUANTITY_ITEM",
        payload
    }
}

export const deleteCartItem = (payload) => {
    return {
        type: "DELETE_ITEM",
        payload
    }
}
import numberWithCommas from "../../hooks/numberWithCommas";
const INITIAL_STATE = {
    products: [],
    total: 0
}

function calculateTotal(arr) {
    if (arr.length) {
        let filterArr = arr.filter(obj => typeof obj === "object")
        if (filterArr.length > 1) {
            let total = filterArr.reduce((prevProduct, currentProduct) => {
                return prevProduct + currentProduct.price.amount
            }, INITIAL_STATE.total)
            return numberWithCommas(total.toFixed(2))
        }

        return filterArr[0].price.amount;
    }
    return 0
}

function quantityCheck(products) {
    let filterdArray = [...new Set(products.map(product => product.id))];
    let filterdProducts = [];
    filterdArray.forEach((product) => {
        let foundProduct = products.find(item => item.id === product);
        filterdProducts.push(foundProduct)
    });
    // console.log(filterdProducts)
    return filterdProducts

}

function increaseQuantity(products, id) {
    let objectIndex = products.findIndex(obj => obj.id === id);
    let updatedObject = products[objectIndex]
    updatedObject.quantity = updatedObject.quantity + 1
    updatedObject.price.amount = updatedObject.price.amount + updatedObject.basePrice;
    return updatedObject;
}

function decreaseQuantity(products, id) {
    let objectIndex = products.findIndex(obj => obj.id === id);
    let updatedObject = products[objectIndex]

    if (updatedObject.quantity > 1) {
        updatedObject.quantity = updatedObject.quantity - 1
        updatedObject.price.amount = updatedObject.price.amount - updatedObject.basePrice;
        //base price to substract an add on it
    }
    return updatedObject;
}

function deleteProduct(products, id) {
    let objectIndex = products.findIndex(obj => obj.id === id);
    let deletedObj = products[objectIndex];

    if (deletedObj.quantity === 1) {

        let filterdProducts = products.filter(product => product.id !== deletedObj.id)
        return filterdProducts
    }
    return products
}

export function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                products: quantityCheck([...state.products, action.payload]),
                total: calculateTotal([...state.products, action.payload])
            };
        case "SET_CART_EMPTY":
            return {
                products: action.payload,
                total: 0
            }
        case "INCREASE_QUANTITY_ITEM":
            return {
                // updateProduct(state.products, action.payload);
                products: quantityCheck([...state.products, increaseQuantity(state.products, action.payload)]),
                total: calculateTotal([...state.products])
            };
        case "DECREASE_QUANTITY_ITEM":
            return {
                products: quantityCheck([...state.products, decreaseQuantity(state.products, action.payload)]),
                total: calculateTotal([...state.products])
            }
        case "DELETE_ITEM":
            return {
                products: deleteProduct(state.products, action.payload),
                total: calculateTotal([...deleteProduct(state.products, action.payload)])
            }
        default:
            return state;
    }
}
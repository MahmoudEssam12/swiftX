import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import currencyReducer from "./currency";

export default combineReducers({
    cart: cartReducer,
    currency: currencyReducer
});
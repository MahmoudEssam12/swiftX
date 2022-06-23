import { legacy_createStore as createStore } from "redux";
import combineReducer from "./reducers/combineReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(combineReducer, composeWithDevTools());

export default store;

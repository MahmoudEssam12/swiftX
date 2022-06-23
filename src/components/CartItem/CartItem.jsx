import React from "react";
import { SizeButton } from "../../pages/ProductPage/ProductPage";
import quantityClasses from "./../Navbar/Navbar.module.scss";
import classes from "./../../pages/ProductPage/ProductPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantityItem,
  decreaseQuantityItem,
  deleteCartItem,
} from "./../../store/actions/cart";
import "./CartItem.scss";
function CartButton({ children, styling, cname, clickEvent }) {
  return (
    <div
      className={classes.cart_button + ` ${cname}`}
      style={styling}
      onClick={clickEvent}
    >
      {children}
    </div>
  );
}

function CartItem({ name, brand, price, gallery, id, quantity, attributes }) {
  const currency = useSelector((state) => state.currency);
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(increaseQuantityItem(id));
  };
  const decreaseQuantity = () => {
    let thisObject = cartState.products.find((product) => product.id === id);
    if (thisObject.quantity > 1) {
      dispatch(decreaseQuantityItem(id));
    } else {
      dispatch(deleteCartItem(id));
    }
  };
  return (
    <div className="cart-item">
      <div className="cart-item__product-details-wrapper">
        <div className="cart-item__product-details">
          <h1>{name}</h1>
          <h2>{brand}</h2>
        </div>
        <p className={classes.price}>
          {currency.symbol}
          {price}
        </p>
        <div className="sizes-wrapper">
          <div className={classes.sizes}>
            {attributes.map((attr) => (
              <SizeButton key={attr.name}>{attr.item.displayValue}</SizeButton>
            ))}

            {/* <SizeButton disabled={classes.sizeButton_disabled}>xs</SizeButton>
            <SizeButton active={classes.sizeButton_active}>s</SizeButton>
            <SizeButton>l</SizeButton> */}
          </div>
        </div>
      </div>
      <div className="img-wrapper">
        <div className={quantityClasses.navbar__product_quantity}>
          <CartButton
            styling={{
              border: "2px solid #000",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            clickEvent={increaseQuantity}
          >
            <i className="fa-solid fa-plus"></i>
          </CartButton>
          <p>{quantity}</p>
          <CartButton
            styling={{
              border: "2px solid #000",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            clickEvent={decreaseQuantity}
          >
            <i className="fa-solid fa-minus"></i>
          </CartButton>
        </div>
        <img src={gallery[0]} alt="product" />
      </div>
    </div>
  );
}

export default CartItem;

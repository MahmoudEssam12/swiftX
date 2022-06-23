import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../Navbar/Navbar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantityItem,
  decreaseQuantityItem,
  deleteCartItem,
} from "./../../store/actions/cart";

function CartButton({ children, styling, cname, clickEvent }) {
  return (
    <div
      className={classes.cart_button + ` ${cname ? cname : ""}`}
      style={styling}
      onClick={clickEvent}
    >
      {children}
    </div>
  );
}

function CartProduct({ name, price, images, quantity, id, attributes }) {
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
    <div className={classes.navbar__cart_product}>
      <div className={classes.navbar__product_details}>
        <h4>{name}</h4>
        <p className="price">
          {currency.symbol}
          {price}
        </p>
        <div>
          {attributes.map((attribute) => (
            <CartButton
              styling={{
                width: "35px",
                height: "25px",
                fontSize: "9px",
                marginRight: "5px",
              }}
              cname={classes.cart_button_active}
              key={attribute.name}
            >
              {" "}
              {attribute.item.displayValue}
            </CartButton>
          ))}
          {/* <CartButton
            styling={{ marginRight: "5px" }}
            cname={classes.cart_button_active}
          >
            S
          </CartButton> */}
        </div>
      </div>
      <div className={classes.navbar__product_quantity}>
        <CartButton
          cname={classes.cart_button_active}
          styling={{
            cursor: "pointer",
          }}
          clickEvent={increaseQuantity}
        >
          <i className="fa-solid fa-plus"></i>
        </CartButton>
        <p>{quantity}</p>
        <CartButton
          cname={classes.cart_button_active}
          styling={{
            cursor: "pointer",
          }}
          clickEvent={decreaseQuantity}
        >
          <i className="fa-solid fa-minus"></i>
        </CartButton>
      </div>
      <div className="product-image">
        <img
          src={images[0]}
          alt="product img"
          style={{ width: "130px", height: "100px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

function Bag({ cartVisible, closePortals }) {
  const cartState = useSelector((state) => state);
  return (
    <div
      className={
        classes.navbar__cart +
        ` ${cartVisible ? classes.navbar__cart_active : ""}`
      }
    >
      <p>
        <strong>My Bag</strong>,{" "}
        {cartState.cart.products.length ? cartState.cart.products.length : ""}
        {cartState.cart.products.length > 1
          ? "Items"
          : cartState.cart.products.length === 1
          ? "Item"
          : cartState.cart.products.length === 0
          ? "Cart is Empty"
          : ""}
      </p>
      <div
        className="products"
        style={{
          maxHeight: "300px",
          overflowY: cartState.cart.products.length > 2 ? "scroll" : "",
        }}
      >
        {cartState.cart.products.length
          ? cartState.cart.products.map((product) => (
              <CartProduct
                name={product.name}
                price={product.price.amount}
                images={product.productImages}
                quantity={product.quantity}
                id={product.id}
                attributes={product.attributes}
                key={product.id}
              />
            ))
          : ""}
      </div>
      <p className={classes.total}>
        <strong>Total</strong>
        <strong>{cartState.currency.symbol + cartState.cart.total}</strong>
      </p>
      <div className={classes.cart_buttons}>
        <NavLink
          to="/cart"
          style={{ flexGrow: !cartState.cart.products.length && "1" }}
        >
          <button
            style={{ width: !cartState.cart.products.length && "100%" }}
            onClick={closePortals}
          >
            View Bag
          </button>
        </NavLink>
        {cartState.cart.products.length ? (
          <button onClick={closePortals}>Checkout</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Bag;

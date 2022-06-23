import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import { useSelector } from "react-redux";
import "./CartPage.scss";

function CartPage() {
  const cartState = useSelector((state) => state.cart);
  return (
    <div className="container cart-wrapper">
      <h1 className="headline">Cart</h1>
      <div className="cartItems">
        {cartState.products.length ? (
          cartState.products.map((product) => (
            <CartItem
              name={product.name}
              brand={product.brand}
              price={product.price.amount}
              gallery={product.productImages}
              id={product.id}
              quantity={product.quantity}
              attributes={product.attributes}
              key={product.id}
            />
          ))
        ) : (
          <div>your cart is empty</div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

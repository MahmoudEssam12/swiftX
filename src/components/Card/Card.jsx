import React from "react";
import classes from "./Card.module.scss";
import cart from "./../../images/productCart.png";
import { Link } from "react-router-dom";
import numberWithCommas from "../../hooks/numberWithCommas";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./../../store/actions/cart";

function Card({
  name,
  inStock,
  productImages,
  price,
  id,
  attributes,
  brand,
  product,
}) {
  const disptach = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const attrList = attributes.map((attribute) => {
    let attr = {
      name: attribute.name,
      item: {
        displayValue: attribute.items[0].displayValue,
        value: attribute.items[0].value,
      },
    };
    return attr;
  });
  // console.log("attributes", attributes);
  const addToCart = () => {
    let item = {
      name,
      inStock,
      productImages,
      price,
      id,
      quantity: 1,
      basePrice: price.amount,
      attributes: attrList,
    };
    let quantityCheck = cartState.products.find(
      (product) => product.id === item.id
    );
    if (!quantityCheck) {
      disptach(setCart(item));
    } else {
      //dispatch new action which updates product's quantity in cart store
    }
  };
  return (
    <div className={classes.card_wrapper}>
      <div className={classes.card_wrapper__img_wrapper}>
        <Link to={`/products/${id}`}>
          <img src={productImages[0]} alt={name} />
          {inStock && <p>Out of stock</p>}
        </Link>
      </div>
      {!inStock && (
        <div className={classes.card_wrapper__cart_icon} onClick={addToCart}>
          <img src={cart} alt="cart" />
        </div>
      )}

      <h3>
        <Link to="/">{name}</Link>
      </h3>
      <p className="price">
        {price.currency.symbol + " " + numberWithCommas(price.amount)}
      </p>
    </div>
  );
}

export default Card;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import cartIcon from "./../../images/cart.png";
import brandIcon from "./../../images/Brand icon.png";
import arrow from "./../../images/arrow.png";
import classes from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import Bag from "../Bag/Bag";
import useFetchCateogry from "../../hooks/use-FetchCateogry";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "./../../store/actions/currency";
import { setCartEmpty } from "./../../store/actions/cart";

function Backdrop(props) {
  return (
    <div
      className={classes.backdrop + ` ${props.hidden ? classes.hidden : ""}`}
      onClick={props.onClose}
    ></div>
  );
}

function Warning(props) {
  const dispatch = useDispatch();

  const emptyCart = () => {
    dispatch(setCartEmpty([]));
    props.setWarning(false);
  };
  return (
    <div
      className={classes.warning + ` ${props.warning ? classes.warn : ""}`}
      onClick={props.close}
    >
      <div className={classes.warning_body}>
        <h2>Warning!</h2>
        <hr />
        <p>
          You can't add products to cart with two different currencies.
          <br />
          do you want to empty your cart to proceed?
        </p>
        <button onClick={emptyCart}>Empty Cart</button>
      </div>
    </div>
  );
}

function Navbar({ categories }) {
  const [currenciesVisible, setCurrenciesVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [warning, setWarning] = useState(false);
  const currency = useSelector((state) => state.currency.symbol);
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log(currency);
  const query = `{
    currencies{
      label
      symbol
    }
  }`;

  const fetchCurrencies = useFetchCateogry(
    process.env.REACT_APP_API_URL,
    query
  );

  const closePortals = () => {
    setCurrenciesVisible(false);
    setCartVisible(false);
    setHidden(true);
  };

  const closeWarning = () => {
    setWarning(false);
  };

  const changeCurrency = (symbol, label) => {
    if (cartState.products.length) {
      setWarning(true);
      return;
    }
    dispatch(setCurrency({ symbol: symbol, label: label }));
    closePortals();
  };

  return (
    <div style={{ position: "relative", zIndex: "6", backgroundColor: "#fff" }}>
      <nav className={classes.navbar + " container"}>
        <ul className={classes.navbar__links}>
          {categories.map((category) => (
            <li key={category.name}>
              <NavLink
                to={`/categories/${category.name}`}
                className={(navData) =>
                  navData.isActive ? classes.navbar__links__active : ""
                }
                state={{ start: 0, max: 4 }}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="icon">
          <NavLink to="/">
            <img src={brandIcon} alt="Brand icon" />
          </NavLink>
        </div>
        <div className="cart-wrapper">
          <div className={classes.currencies}>
            <div
              className={classes.currencies__head}
              onClick={() => {
                setCurrenciesVisible((prev) => !prev);
                setCartVisible(false);
                setHidden(true);
              }}
            >
              <span>{currency}</span>
              <img
                src={arrow}
                className={currenciesVisible ? classes.img__rotation : ""}
                alt="drop down list arrow"
              />
            </div>
            <ul
              className={currenciesVisible ? classes.currencies__active : " "}
            >
              {fetchCurrencies.currencies?.map((currency) => (
                <li
                  key={currency.label}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    changeCurrency(currency.symbol, currency.label)
                  }
                >
                  {currency.symbol + " "} {currency.label}
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.navbar__cart_wrapper}>
            <img
              src={cartIcon}
              alt="cart icon"
              onClick={() => {
                setCartVisible((prev) => !prev);
                setCurrenciesVisible(false);
                setHidden((prev) => !prev);
              }}
            />
            {ReactDOM.createPortal(
              <Backdrop onClose={closePortals} hidden={hidden} />,
              document.getElementById("backDrop")
            )}
            {ReactDOM.createPortal(
              <Warning
                close={closeWarning}
                warning={warning}
                setWarning={setWarning}
              />,
              document.getElementById("warning")
            )}
            <Bag cartVisible={cartVisible} closePortals={closePortals} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

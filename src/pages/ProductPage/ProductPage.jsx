import React, { useState, useEffect } from "react";
import classes from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./../../store/actions/cart";
import numberWithCommas from "../../hooks/numberWithCommas";

export function SizeButton({
  children,
  active,
  disabled,
  bgColor,
  clickEvent,
}) {
  return (
    <div
      className={`${classes.sizeButton} ${active ? active : ""} ${
        disabled ? disabled : ""
      }`}
      style={{ backgroundColor: bgColor }}
      onClick={clickEvent}
    >
      {children}
    </div>
  );
}
function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentCurrency, setcurrentCurrency] = useState({
    symbol: "",
    amount: "",
  });
  const storeCurrency = useSelector((state) => state.currency);
  const [mainImgSrc, setMainImgSrc] = useState("");
  let selectedAttributesInit = [
    { name: "Color", item: { displayValue: "Black", value: "#000" } },
    { name: "Capacity", item: { displayValue: "512G", value: "512G" } },
  ];
  const [selectedAttributes, setSelectedAttributes] = useState(
    selectedAttributesInit
  );

  const disptach = useDispatch();

  const addToCart = () => {
    let item = {
      name: product.name,
      inStock: product.inStock,
      productImages: product.gallery,
      price: { amount: currentCurrency.amount },
      id: product.id,
      quantity: 1,
      basePrice: currentCurrency.amount,
      attributes: selectedAttributes,
    };
    disptach(setCart(item));
    console.log(item);
  };
  const matchSelectedAttribute = (attr, displayValue) => {
    return attr.item.displayValue === displayValue;
  };
  const selectAttribute = (attr) => {
    let attribute = {
      name: attr.name,
      item: {
        displayValue: attr.displayValue,
        value: attr.val,
      },
    };

    let newState = selectedAttributes.map((obj) => {
      if (obj.name === attribute.name) return attribute;
      return obj;
    });
    setSelectedAttributes(newState);
  };
  // query to get the product details
  const query = `{
    product(id:"${productId}"){
      id 
      name
      inStock
      gallery
      description
      category
      attributes {name,type,items{displayValue,value}}
      prices {currency {label,symbol}, amount}
      brand
    }
  }`;

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data.product);
        setLoading(false);
        setMainImgSrc(data.data.product.gallery[0]);
        console.log(data.data.product);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    let currency = product?.prices?.find((price) => {
      return price.currency.label === storeCurrency.label;
    });

    setcurrentCurrency({
      symbol: currency?.currency?.symbol,
      amount: currency?.amount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, storeCurrency]);

  return (
    <div className={`container ${classes.product_page_wrapper}`}>
      {!loading ? (
        <>
          <div className={classes.pictures}>
            <ul
              style={{
                overflowY: product.gallery.length > 3 ? "scroll" : "unset",
              }}
            >
              {product.gallery.map((img, index) => (
                <li
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => setMainImgSrc(img)}
                >
                  <img src={img} alt={img} />
                </li>
              ))}
            </ul>
            <img
              src={mainImgSrc}
              className={classes.pictures__main_image}
              alt={mainImgSrc}
            />
          </div>
          <div className={classes.product_details_wrapper}>
            <div className={classes.product_details}>
              <h1>{product.name}</h1>
              <h2>{product.brand}</h2>
            </div>

            {product.inStock && <p style={{ color: "red" }}>Out of stock</p>}
            {product.attributes.map((attribute) => (
              <div className="sizes-wrapper" key={attribute.name}>
                <strong>{attribute.name}:</strong>
                <div className={classes.sizes}>
                  {attribute.items.map((item, index) => (
                    <SizeButton
                      key={index}
                      bgColor={item.value}
                      active={
                        selectedAttributes.find((attr) =>
                          matchSelectedAttribute(attr, item.displayValue)
                        ) !== undefined
                          ? classes.sizeButton_active
                          : " "
                      }
                      clickEvent={() =>
                        selectAttribute({
                          name: attribute.name,
                          displayValue: item.displayValue,
                          val: item.value,
                        })
                      }
                    >
                      {item.displayValue}
                    </SizeButton>
                  ))}
                  {/* <SizeButton disabled={classes.sizeButton_disabled}>
                xs
              </SizeButton>
              <SizeButton active={classes.sizeButton_active}>s</SizeButton>
              <SizeButton>m</SizeButton>
              <SizeButton>l</SizeButton> */}
                </div>
              </div>
            ))}

            <p className={classes.price}>
              <strong>Price:</strong>
              {currentCurrency.symbol +
                numberWithCommas(currentCurrency.amount)}
            </p>
            {!product.inStock ? (
              <button className={classes.add__button} onClick={addToCart}>
                Add to cart
              </button>
            ) : (
              ""
            )}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            {/* Find stunning women's cocktail dresses and party dresses. Stand
              out in lace and metallic cocktail dresses and party dresses from
              all your favorite brands. */}
            {/* {product.description} */}
          </div>
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}

export default ProductPage;

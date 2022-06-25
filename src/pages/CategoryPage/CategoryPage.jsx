import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../../components/Card/Card";
import classes from "./CategoryPage.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CategoryPage() {
  const { categoryName } = useParams();
  const [category, setCategory] = useState({});
  const storeCurrency = useSelector((state) => state.currency);
  // infinte scroll states

  const [accumulatorArr, setAccumulatorArr] = useState([]);

  // const observer = useRef();
  // const lastProductElement = useCallback(
  //   (node) => {
  //     const infiniteScroll = () => {
  //       let partofArr = category.products.slice(start, max);
  //       setAccumulatorArr((prev) => [...prev, ...partofArr]);
  //       setStart(max);
  //       setMax((prev) => prev + 3);
  //       // return accumulatorArr;
  //     };
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       // console.log(entries);
  //       if (
  //         entries[0].isIntersecting &&
  //         accumulatorArr.length !== category.products.length
  //       ) {
  //         console.log("inside", accumulatorArr);
  //         infiniteScroll();
  //         // console.log("visible");
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [accumulatorArr, category, max, start]
  // );
  const query = `{
    category(input:{title:"${categoryName}"}){
      name
      products {
      id
      name
      inStock
      gallery
      prices{currency{label,symbol},amount},
      brand,
      attributes {name,type,items{displayValue,value}}
      }
    }
  }`;

  // useEffect(() => {
  //   setStart(0);
  //   setMax(6);

  //   // console.log(location);
  // }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        let sliced = data.data.category.products;
        setCategory(data.data.category);
        setAccumulatorArr(sliced);
        // setStart(max);
        // setMax((prev) => prev + 3);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  // useEffect(() => {
  //   // console.log(category);
  // }, [category, start, max]);
  // useEffect(() => {
  //   console.log("outside", accumulatorArr);
  //   console.log("category", category);
  // }, [category]);

  return (
    <div className="container">
      <h1 className={classes.category_name}>{category?.name?.toUpperCase()}</h1>
      <div className={classes.products_wrapper}>
        {accumulatorArr?.map((product, index) => {
          let currency = product.prices.find((price) => {
            return price.currency.label === storeCurrency.label;
          });
          // if (accumulatorArr.length === index + 1) {
          //   return (
          //     <div ref={lastProductElement} key={product.name}>
          //       <Card
          //         name={product.name}
          //         inStock={product.inStock}
          //         productImages={product.gallery}
          //         price={currency}
          //         id={product.id}
          //         brand={product.brand}
          //         attributes={product.attributes}
          //         product={product}
          //       />
          //     </div>
          //   );
          // }
          return (
            <Card
              name={product.name}
              inStock={product.inStock}
              productImages={product.gallery}
              price={currency}
              id={product.id}
              brand={product.brand}
              attributes={product.attributes}
              product={product}
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPage;

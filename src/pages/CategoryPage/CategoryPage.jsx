import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import classes from "./CategoryPage.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CategoryPage() {
  const { categoryName } = useParams();
  const [category, setCategory] = useState({});
  const storeCurrency = useSelector((state) => state.currency);

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
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data.category);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return (
    <div className="container">
      <h1 className={classes.category_name}>{category?.name?.toUpperCase()}</h1>
      <div className={classes.products_wrapper}>
        {category?.products?.map((product) => {
          let currency = product.prices.find((price) => {
            return price.currency.label === storeCurrency.label;
          });
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

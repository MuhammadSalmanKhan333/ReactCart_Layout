import React from "react";
import ProductImages from "../ProductImages";
import ProductInfo from "../ProductInfo";
import "./Products.css";

const Products = ({ data }) => {
  return (
    <>
      <div className="product-images">
        <ProductImages getdata={data} />
      </div>
      <div className="product-info">
        <ProductInfo getdata={data} />
      </div>
    </>
  );
};

export default React.memo(Products);

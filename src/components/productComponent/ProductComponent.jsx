import React from "react";
import ProductImages from "../ProductImages";
import "./ProductComponent.css";
import ProductInfo from "../ProductInfo";

const ProductComponent = () => {
  return (
    <div className="product-container">
      <div className="product-images">
        <ProductImages />
      </div>
      <div className="product-info">
        <ProductInfo />
      </div>
    </div>
  );
};

export default ProductComponent;

import React, { useState } from "react";
import "./ProductInfo.css";
import { sizes } from "../data/data";

const ProductInfo = (props) => {
  const sized = {
    S: 122.0,
    M: 135.0,
    L: 138.0,
    XL: 145.0,
  };

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  function handleClick(size) {
    setSelectedSize(size);
  }
  let discount = props.getdata.discount;
  let originalPrice = sized[selectedSize];
  let discountPrice = originalPrice * (discount / 100);
  let finalPrice = originalPrice - discountPrice;

  return (
    <>
      <div>
        <p className="brand">{props.getdata.brand}</p>
        <h1 className="product-title">{props.getdata.title}</h1>
        <p className="product-description">{props.getdata.description}</p>
        <div className="product-price">
          <p className="discount-price" id="discount-price">
            <span id="discounted-price">${finalPrice.toFixed(2)}</span>
            <span className="discount" id="discount">
              {props.getdata.discount}%
            </span>
          </p>
          <p className="original-price">
            $<span id="original-price">{originalPrice.toFixed(2)}</span>
          </p>
        </div>
        <div className="size-selector">
          <p>CHOOSE SIZE</p>
          {sizes.map((size) => (
            <button
              key={size}
              id={size}
              className={size === selectedSize ? "selected" : ""}
              onClick={() => {
                handleClick(size);
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className="add-to-bag" id="addToBag">
          ADD TO BAG
        </button>
      </div>
    </>
  );
};

export default ProductInfo;

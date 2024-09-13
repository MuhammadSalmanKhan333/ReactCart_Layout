import React, { useState } from "react";
import "./ProductComponent.css";
import { dataObj } from "../../data/data";
import PopUpModel from "../modelComponent/PopUpModel";
import Products from "../products/Products";

const ProductComponent = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(dataObj);
  const handleShow = () => setShow(true);

  const saveData = (data) => {
    setProduct((prevProduct) => [data, ...prevProduct]);
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="addbtn" onClick={handleShow}>
          Add Product
        </button>
        {show && (
          <PopUpModel show={show} setShow={setShow} saveData={saveData} />
        )}
      </div>
      {product.map((data, index) => (
        <div key={index} className="product-container">
          <Products data={data} />
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;

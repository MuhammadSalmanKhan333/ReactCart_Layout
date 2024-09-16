import React, { useState } from "react";
import "./ProductComponent.css";
import { dataObj } from "../../data/data";
import PopUpModel from "../modelComponent/PopUpModel";
import Products from "../products/Products";

const ProductComponent = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(dataObj);
  const [data, setData] = useState(null);
  const handleShow = (data) => {
    setShow(true);
    if (data) {
      setData(data);
    }
  };

  const saveData = (data, index) => {
    if (index || index === 0) {
      console.log("save function", index);
      // product[index] = data;
      // const updatedProducts = product?.map((item, i) =>
      //   i === index ? data : iten
      // );
      // const updatedProducts = product.splice(index, 1, data);
      let updatedProducts = [...product];
      updatedProducts.splice(index, 1, data);

      console.log({ product }, { updatedProducts }, { index });

      setProduct([...updatedProducts]);
      // setProduct((prevProduct) => ({ [index]: data, ...prevProduct }));
    } else {
      setProduct((prevProduct) => [data, ...prevProduct]);
    }
  };

  // const saveData = (data, index) => {
  //   if (index || index === 0) {
  //     console.log("save function", index);
  //     setProduct((prevProduct) =>
  //       prevProduct.map((prev, i) => (i === index ? data : prev))
  //     );
  //   } else {
  //     setProduct((prevProduct) => [data, ...prevProduct]);
  //   }
  // };

  return (
    <div className="container">
      <div className="button-container">
        <button className="addbtn" onClick={handleShow}>
          Add Product
        </button>
        {show && (
          <PopUpModel
            show={show}
            setShow={setShow}
            saveData={saveData}
            data={data}
          />
        )}
      </div>
      {product.map((data, index) => (
        <div key={index} className="product-container">
          <div>
            <button
              className="editbtn"
              onClick={() => handleShow({ index, ...data })}
            >
              Edit Product
            </button>
          </div>
          <Products data={data} />
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;

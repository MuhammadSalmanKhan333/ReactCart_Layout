import React, { useState } from "react";
import "./ProductComponent.css";
import { dataObj } from "../../data/data";
import PopUpModel from "../modelComponent/PopUpModel";
import Products from "../products/Products";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationDialog from "../confirmationDialog/DeleteConfirmationDialog";

const ProductComponent = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(dataObj);
  const [data, setData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState([]);

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
      setProduct([...updatedProducts]);
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
  const handleDeleteConfirmation = (index) => {
    setDeleteProduct(index);
    setShowConfirmation(true);
  };
  const handleDelete = () => {
    const remainingProduct = [...product];
    remainingProduct.splice(deleteProduct, 1);
    setProduct(remainingProduct);
    setShowConfirmation(false);
  };

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
      {product.length == 0 ? (
        <h1>Data not found</h1>
      ) : (
        product.map((data, index) => (
          <div key={index} className="product-container">
            <div>
              <button
                className="editbtn"
                onClick={() => handleShow({ index, ...data })}
              >
                Edit Product
              </button>
              <button
                className="deletbtn"
                onClick={() => handleDeleteConfirmation(index)}
              >
                <MdDelete className="deleteIcon" /> Delete Product
              </button>
            </div>
            <Products data={data} />
          </div>
        ))
      )}
      <DeleteConfirmationDialog
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onDelete={handleDelete} // Pass the delete handler
      />
    </div>
  );
};

export default ProductComponent;

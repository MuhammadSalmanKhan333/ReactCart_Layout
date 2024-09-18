import React, { useState } from "react";
import "./ProductComponent.css";
import { dataObj } from "../../data/data";
import PopUpModel from "../modelComponent/PopUpModel";
import Products from "../products/Products";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      // product[index] = data;
      // const updatedProducts = product?.map((item, i) =>
      //   i === index ? data : iten
      // );
      // const updatedProducts = product.splice(index, 1, data);
      let updatedProducts = [...product];
      const newProducts = updatedProducts.filter(
        (item, i) =>
          i !== index && item.brand == data.brand && item.title == data.title
      );
      if (newProducts.length <= 0) {
        updatedProducts.splice(index, 1, data);
        setProduct([...updatedProducts]);
        setShow(false);
      } else {
        toast.error("🦄 Brand Name && Brand Title not Unique", {
          position: "top-right",
          autoClose: 5000,
          draggable: true,
          theme: "light",
        });
        setShow(true);
      }
    } else {
      const newProduct = product.filter(
        (item) => item.brand == data.brand && item.title == data.title
      );
      if (newProduct.length == 0) {
        setProduct((prevProduct) => [data, ...prevProduct]);
        setShow(false);
      } else {
        toast.error("🦄 Brand Name && Brand Title not Unique", {
          position: "top-right",
          autoClose: 5000,
          draggable: true,
          theme: "light",
        });
        setShow(true);
      }
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
  // Delete By Index
  // const handleDeleteConfirmation = (index) => {
  //   setDeleteProduct(index);
  //   setShowConfirmation(true);
  // };
  // const handleDelete = () => {
  //   const remainingProduct = [...product];
  //   remainingProduct.splice(deleteProduct, 1);
  //   setProduct(remainingProduct);
  //   setShowConfirmation(false);
  // };

  // Delete by brand title and brand Name
  const handleDeleteConfirmation = (data) => {
    setDeleteProduct(data);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    const products = [...product];
    console.log("delete p", deleteProduct);
    console.log("PRODUCTS", product);
    const remainingProduct = products.filter((items) => {
      console.log("iiii", items, deleteProduct);
      return (
        items.brand !== deleteProduct.brand ||
        items.title !== deleteProduct.title
      );
    });
    console.log(remainingProduct);
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
      {!product || product?.length === 0 ? (
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
                onClick={() => handleDeleteConfirmation(data, index)}
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
      <ToastContainer />
    </div>
  );
};

export default ProductComponent;

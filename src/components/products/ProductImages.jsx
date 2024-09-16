import React, { useEffect, useState } from "react";
import "./ProductImages.css";

const ProductImages = (props) => {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    setSelectedImg(props.getdata?.imagePaths?.[0]);
  }, [props.getdata.imagePaths]);

  function handleChange(path) {
    setSelectedImg(path);
  }

  return (
    <div className="product-images">
      <div className="thumbnails">
        {props.getdata?.imagePaths?.map((path, index) => (
          <img
            key={index}
            src={path}
            alt={`Image ${index + 1}`}
            className={`thumbnail ${selectedImg === path ? "active" : ""}`}
            onClick={() => handleChange(path)}
          />
        ))}
      </div>
      <div className="main-image-container">
        <img
          src={selectedImg}
          alt="Main image is not showing"
          id="main-image"
          className=""
        />
      </div>
    </div>
  );
};

export default ProductImages;

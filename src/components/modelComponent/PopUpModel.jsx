import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

function PopUpModel({ show, setShow, saveData, data }) {
  const [disable, setDisable] = useState(true);
  const [formData, setFormData] = useState({
    brand: data.brand || "",
    title: data.title || "",
    discount: data.discount || 0,
    description: data.description || "",
    imagePaths: data.imagePaths || [],
  });
  const [error, setError] = useState({
    brand: true,
    title: true,
    discount: true,
    description: true,
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleImage = (e) => {
    var files = Array.from(e.target.files);
    const imagepath = files.map((file) => {
      const fileUrl = URL.createObjectURL(file);
      return fileUrl;
    });
    setFormData((prev) => ({
      ...prev,
      imagePaths: [...imagepath],
    }));
  };

  const handleSave = () => {
    if (data?.index || data.index === 0) {
      saveData(formData, data.index);
    } else {
      saveData(formData);
    }
    handleClose();
    window.scrollTo(top, { behavior: "smooth" });
  };
  const validateForm = () => {
    const { brand, title, discount, description, imagePaths } = formData;
    let errors = {
      brand: "",
      title: "",
      discount: "",
      description: "",
      imagePaths: "",
    };

    if (brand.trim() === "") {
      errors.brand = "Brand name is required";
    }
    if (title.trim() === "") {
      errors.title = "Brand title is required";
    }
    if (discount <= 0 || discount > 50) {
      errors.discount = "Discount must be between 1 and 50";
    }
    if (description.trim() === "") {
      errors.description = "Brand description is required";
    }
    if (imagePaths.length <= 0) {
      errors.imagePaths = "Images is not added";
    } else {
      errors.imagePaths = "";
    }
    setError(errors);
    setDisable(
      errors.brand ||
        errors.title ||
        errors.discount ||
        errors.description ||
        errors.imagePaths
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="brand">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter brand name"
                autoFocus
                value={formData.brand}
                onChange={handleChange}
              />
              {error.brand && <p className="text-danger">{error.brand}</p>}
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Brand Title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter brand description"
                value={formData.title}
                onChange={handleChange}
              />
              {error.title && (
                <p className="text-danger">The field value is empty </p>
              )}
            </Form.Group>
            <Form.Group controlId="discount">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                required
                value={formData.discount}
                placeholder="Enter brand discount"
                onChange={handleChange}
              />
              {error.discount && (
                <p className="text-danger">{error.discount}</p>
              )}
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Brand Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={3}
                placeholder="Enter brand description"
                value={formData.description}
                onChange={handleChange}
              />
              {error.description && (
                <p className="text-danger">The field value is empty </p>
              )}
            </Form.Group>
            <Form.Group controlId="imagePaths">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                required
                multiple
                accept="image/*"
                onChange={handleImage}
              />
            </Form.Group>
            <Form.Group controlId="imagePreview">
              <Form.Label className="d-block mt-4">Image Preview</Form.Label>
              {formData.imagePaths &&
                formData.imagePaths.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    rounded
                    className={`mt-4 mx-3 p-3 w-25 h-auto ${
                      formData.imagePaths ? "border border-2 border-dark" : ""
                    }`}
                  />
                ))}
              {error.imagePaths && (
                <p className="text-danger">Image is not selected</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button disabled={disable} variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpModel;

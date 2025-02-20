import React, { useState } from "react";
import style from "../../css/Dashboard.module.css";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: "",
    description: "",
    date: "",
  });

  const [productList, setProductList] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Fetch existing product list
    const storedProducts = localStorage.getItem("product");

    const productArrayList = storedProducts ? JSON.parse(storedProducts) : [];

    const updated_product_list = [...productArrayList, product];

    localStorage.setItem("product", JSON.stringify(updated_product_list));

    // Update the product List
    setProductList(updated_product_list);
    // Reset form after submission
    setProduct({
      productName: "",
      price: "",
      quantity: "",
      description: "",
      date: "",
    });
    alert("Product data saved successfully! 🎉");
  };

  return (
    <div className=" shadow   border p-3   ">
      <h4 className="text-center">ProductForm</h4>
      <form
        className="p-2"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 ">
          <label htmlFor="product-name" className="form-label fw-bold">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            aria-describedby="productName"
            placeholder="Enter Product Name"
            onChange={handleOnChange}
            value={product.productName}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="price" className="form-label fw-bold">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter Price"
            onChange={handleOnChange}
            value={product.price}
          />
        </div>

        {/* {Quantity} */}
        <div className="mb-2 ">
          <label htmlFor="quantity" className="form-label fw-bold">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Enter Quantity"
            onChange={handleOnChange}
            value={product.quantity}
            name="quantity"
          />
        </div>

        {/* {Description} */}
        <div className="mb-2 ">
          <label htmlFor="quantity" className="form-label fw-bold">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter Description"
            onChange={handleOnChange}
            value={product.description}
            name="description"
          />
        </div>

        {/* {Date} */}
        <div className="mb-2 ">
          <label htmlFor="quantity" className="form-label fw-bold">
            Order Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="Enter Date"
            onChange={handleOnChange}
            value={product.date}
            name="date"
          />
        </div>

        <div className="text-center mt-2">
          <button type="submit" className="btn  btn-outline-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

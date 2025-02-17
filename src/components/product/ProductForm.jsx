import React, { useEffect, useState } from "react";
import style from "../../css/Dashboard.module.css";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: "",
    description: "",
    date: "",
    category: "",
  });

  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const contentType = response.headers.get("Content-Type");

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      if (contentType && contentType.includes("application/json")) {
        const saved_data = await response.json();
        setProductList((prev) => [...prev, saved_data]);
      } else {
        const textResponse = await response.text();
        console.warn("Received non-JSON response:", textResponse);
      }

      setProduct({
        productName: "",
        price: "",
        quantity: "",
        description: "",
        date: "",
        category: "",
      });
      alert("Product data saved successfully! 🎉");
    } catch (error) {
      console.error("Error:", error.message);
    }

    // Reset form after submission
  };

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch("http://localhost:8080/category");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await response.json();
        setCategories(json);
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetch_data();
  }, []);

  return (
    <div className=" shadow rounded border p-5   ">
      <h1 className="text-center">ProductForm</h1>

      <form
        className={`mb-5  ${style.responsive_form} `}
        style={{ height: "50vh" }}
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
          <textarea
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
        {/* {Category} */}
        <div className="mb-2 ">
          <label htmlFor="quantity" className="form-label fw-bold">
            Category:
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            aria-label="select category"
            onChange={handleOnChange}
            value={product.category}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mt-3  ">
          <button type="submit" className="btn  btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

import React, { useEffect, useState } from "react";
import List from "./List";

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("product");

      if (storedData) {
        const parseData = JSON.parse(storedData);
        setProductList(parseData);
      }
    };

    fetchData(); // fetch data on mount

    //listen for storage change in other tabs
    window.addEventListener("storage", fetchData);

    return () => {
      window.removeEventListener("storage", fetchData);
    };
  }, []);

  const handleDelete = (index) => {
    const updateList = productList.filter((_, i) => i !== index);

    setProductList(updateList);

    localStorage.setItem("product", JSON.stringify(updateList));
  };

  const handleUpdate = (index) => {
    alert("Product updating of " + index);
  };

  return (
    <div className="shadow rounded border p-4   ">
      <h1 className="text-center mb-3">Product List</h1>
      <List
        productList={productList}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default ProductList;

import React from "react";
import style from "../../css/Dashboard.module.css";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const Dashboard = () => {
  return (
    <>
      <h1 className={`${style.main} text-center   `}>Inventory App</h1>

      <div className="p-2">
        <div className=" row g-4   ">
          <div className=" col-12  col-lg-4 col-md-4 ">
            <ProductForm />
          </div>
          <div className=" col-12 col-lg-8 col-md-4">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

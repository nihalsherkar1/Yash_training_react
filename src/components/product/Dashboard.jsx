import React from "react";
import style from "../../css/Dashboard.module.css";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const Dashboard = () => {
  return (
    <>
      <h1 className={`${style.main} text-center   `}>Inventory App</h1>

      <div className="d-flex  flex-wrap     ">
        <div
          className="  "
          style={{ height: "100vh", width: "30%", marginLeft: "15px" }}
        >
          <ProductForm />
        </div>
        <div
          className=" "
          style={{ height: "100vh", width: "68%", marginLeft: "15px" }}
        >
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

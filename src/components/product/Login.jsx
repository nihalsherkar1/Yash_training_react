import React, { useState } from "react";
import Button from "./Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const successToast = () => {
    toast.success("Login successful !!");
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      //get data from local storage
      const users = JSON.parse(localStorage.getItem("data")) || [];

      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (user) {
        successToast("Login successful!!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        errorToast("No user found, Please register!!");
      }
    },
  });

  //   const [data, setData] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  return (
    <div className="container">
      <div className="row  ">
        <div className="col-md-6 offset-md-3   ">
          <form
            className="border p-4 shadow rounded mt-5    "
            onSubmit={formik.handleSubmit}
          >
            <div className="form-group mb-3 ">
              <div className="text-center  ">
                <h1 className="">Login</h1>
                <hr className="text-dark " />
              </div>
              <label htmlFor="email" className="fs-4 fw-semibold">
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                } `}
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger"> {formik.errors.email} </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="fs-4 fw-semibold">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>
            <div className="text-center">
              <button className="btn btn-md mx-2  btn-outline-primary">
                Login
              </button>
            </div>
            <div className="text-center mt-2 d-flex">
              <a href="#">Forgot Password?</a>
              <span className="ms-auto">
                <a href="/register"> Register </a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />;
    </div>
  );
};

export default Login;

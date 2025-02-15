import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object({
    name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const successToast = (msg) => {
    toast.success(msg);
  };

  const errorToast = (msg) => {
    toast.error(msg);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      let users = JSON.parse(localStorage.getItem("data")) || [];

      const userExists = users.some((user) => user.email === values.email);

      if (userExists) {
        errorToast("This User already exists");
      } else {
        users.push(values);
        localStorage.setItem("data", JSON.stringify(users));
        successToast("User registered successfully");
        navigate("/login");
      }
    },
  });

  //   const [data, setData] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     role: "USER",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //   };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3  ">
          <h1>Register</h1>
          <form
            className="border p-4 shadow rounded mt-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-group mb-3">
              <label htmlFor="name" className="fs-4 fw-semibold">
                User Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                } `}
                id="name"
                placeholder="Enter Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                id="role"
                placeholder="Enter password"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
                hidden
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-md mx-2  btn-outline-primary"
              >
                Register
              </button>
            </div>
            <div className="text-center mt-2 d-flex">
              <a href="#">Forgot Password?</a>
              <span className="ms-auto">
                <a href="/login"> Login </a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />;
    </div>
  );
};

export default Register;

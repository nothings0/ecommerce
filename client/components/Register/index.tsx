"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import "./index.scss";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "@/config/axiosConfig";

const Register: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmedPassword: "",
      },
      validationSchema: Yup.object({
        username: Yup.string()
          .required("Required")
          .min(6, "Must be 6 characters or more"),
        email: Yup.string()
          .required("Required")
          .matches(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter a valid email address"
          ),
        password: Yup.string()
          .required("Required")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "Password must be more than 8 characters, contain at least 1 number"
          ),
        confirmedPassword: Yup.string()
          .required("Required")
          .oneOf([Yup.ref("password"), ""], "Incorrect password"),
      }),
      onSubmit: async (values) => {
        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        try {
          await axiosClient.post("/auth/local/register", newUser);
          router.push("/login");
        } catch (error: any) {
          setError(error.response.data.error.message);
        }
      },
    });

  return (
    <div className="register-modal">
      <div className="register-head">Đăng ký</div>
      <form action="" className="register-form">
        <div className="register-item">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="nhập username..."
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <p className="errorMsg"> {errors.username} </p>
          )}
        </div>
        <div className="register-item">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            placeholder="nhập email..."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="errorMsg"> {errors.email} </p>
          )}
        </div>
        <div className="register-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="nhập password..."
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="errorMsg"> {errors.password} </p>
          )}
        </div>
        <div className="register-item">
          <label htmlFor="confirmedPassword">Confirmed password</label>
          <input
            type="password"
            id="confirmedPassword"
            placeholder="nhập password..."
            value={values.confirmedPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmedPassword && touched.confirmedPassword && (
            <p className="errorMsg"> {errors.confirmedPassword} </p>
          )}
        </div>
        {error && <p className="errorMsg">{error}</p>}
      </form>
      <div className="register-button">
        <Button type="primary" size="md" OnClick={handleSubmit}>
          register
        </Button>
      </div>
      <div className="register-link">
        Bạn đã có tài khoản ? <Link href="/login">đăng nhập</Link>
      </div>
    </div>
  );
};

export default Register;

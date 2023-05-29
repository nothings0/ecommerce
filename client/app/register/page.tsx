import React from "react";
import "./index.scss";
import RegisterModal from "../../components/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
};

const Register = () => {
  return (
    <div className="register main">
      <div className="container">
        <RegisterModal />
      </div>
    </div>
  );
};

export default Register;

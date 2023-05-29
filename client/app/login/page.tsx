import React from "react";
import "./index.scss";
import LoginModal from "../../components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

const Login = () => {
  return (
    <div className="login main">
      <div className="container">
        <LoginModal />
      </div>
    </div>
  );
};

export default Login;

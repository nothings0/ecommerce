import React from "react";
import "./index.scss";
import LoginModal from "../../components/Login";

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

import React from "react";
import "./index.scss";
import RegisterModal from "../../components/Register";

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

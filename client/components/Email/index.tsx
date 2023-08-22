import Image from "next/image";
import React from "react";
import "./index.scss";
import emailImg from "@/assets/email.png";
import Button from "../Button";

const Email = () => {
  return (
    <div className="email">
      <Image src={emailImg} alt="banner image" />
      <div className="email__text">
        <h4>Get our latest offer</h4>
        <div className="email__contact">
          <div className="input">
            <input type="text" placeholder="your email" />
            <Button type="primary" size="md">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;

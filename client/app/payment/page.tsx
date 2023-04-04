"use client";
import React, { useState } from "react";
import MultiForm from "./MultiForm";
import OrderDetail from "./OrderDetail";
import "./index.scss";

const Payment = () => {
  const [index, setIndex] = useState<number>(0);

  const handleIndex = (type: string) => {
    if (type === "inc") {
      if (index < 1) return;
      setIndex((index) => index - 1);
    } else if (type === "dec") {
      if (index >= 2) return;
      setIndex((index) => index + 1);
    }
  };

  return (
    <div className="payment main">
      <div className="container">
        <MultiForm
          index={index}
          onHandleIndex={(x: string) => handleIndex(x)}
        />
        <OrderDetail />
      </div>
    </div>
  );
};

export default Payment;

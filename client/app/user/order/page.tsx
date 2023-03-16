"use client";
import React, { useState } from "react";
import "./order.scss";
import OrderWrap from "./OrderWrap";

const tabs = [
  {
    id: 1,
    text: "tất cả đơn",
    type: "all",
  },
  {
    id: 2,
    text: "đang xử lý",
    type: "pending",
  },
  {
    id: 3,
    text: "đang vận chuyển",
    type: "shipping",
  },
  {
    id: 4,
    text: "đã giao",
    type: "success",
  },
  {
    id: 5,
    text: "đã hủy",
    type: "faild",
  },
];
const page = () => {
  const [type, setType] = useState<string>("all");

  return (
    <div className="order">
      <div className="order-heading">Đơn hàng của tôi</div>
      <div className="order-container">
        <div className="order-tap">
          {tabs.map((item) => (
            <div
              className={`tab-item ${type === item.type ? "active" : ""}`}
              key={item.id}
              onClick={() => setType(item.type)}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="order-content">
          <OrderWrap type={type} />
        </div>
      </div>
    </div>
  );
};

export default page;

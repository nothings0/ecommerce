"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import useOrderStore from "@/zustand/orderSlice";

const payments = [
  {
    text: "Thanh toán tiền mặt khi nhận hàng",
    id: 1,
  },
  {
    text: "Thanh toán bằng VN PAY",
    id: 2,
  },
  {
    text: "Thanh toán bằng ví MoMo",
    id: 3,
  },
  {
    text: "Thanh toán bằng ví ZaloPay",
    id: 4,
  },
  {
    text: "Thanh toán bằng tài khoản ngân hàng",
    id: 5,
  },
];

interface IProps {
  onHandleIndex: (x: string) => void;
}

const PaymentForm: React.FC<IProps> = ({ onHandleIndex }) => {
  const { setDeliveryType: onSetDeliveryType } = useOrderStore();

  const [deliveryType, setDeliveryType] = useState<{
    text: string;
    id: number;
  }>();

  const handlePayments = (text: string, id: number) => {
    setDeliveryType({ id, text });
  };

  const handleGoOn = () => {
    if (!deliveryType) {
      alert("vui lòng chọn hình thức thanh toán");
      return;
    } else {
      onSetDeliveryType(deliveryType);
    }
    onHandleIndex("dec");
  };

  return (
    <div className="form-payment">
      <div className="form-container">
        <h3>Chọn hình thức thanh toán</h3>
        <div className="payment-wrap">
          {payments.map((item, index) => (
            <div
              className={`payment-item ${index > 2 ? "disable" : ""}`}
              key={index}
            >
              <input
                type="radio"
                id={`input-${item.id}`}
                name="a"
                value={item.id}
                onChange={(e) => handlePayments(item.text, item.id)}
              />
              <label htmlFor={`input-${item.id}`}>{item.text}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-button">
        <Button type="primary" size="md" OnClick={handleGoOn}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;

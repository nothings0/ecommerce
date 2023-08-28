"use client";
import { axiosPrimary } from "@/config/axiosConfig";
import useOrderStore from "@/zustand/orderSlice";
import useProductStore from "@/zustand/productSlice";
import useUserStore from "@/zustand/userSlice";
import React, { useEffect } from "react";
import "./index.scss";
const page = () => {
  const { order } = useOrderStore();
  const { removeProduct } = useProductStore();
  const { user, jwt } = useUserStore();

  const handleOrder1 = async () => {
    const data = {
      customer_id: user?.id,
      products: order,
    };
    try {
      await axiosPrimary.post("/orders", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      removeProduct(order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleOrder1();
  }, []);

  return (
    <div className="checkout main">
      <div className="checkout__container">
        <h2>Thanh toán thành công!!!</h2>
      </div>
    </div>
  );
};

export default page;

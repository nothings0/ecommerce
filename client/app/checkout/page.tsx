"use client";
import { axiosPrimary } from "@/config/axiosConfig";
import useOrderStore from "@/zustand/orderSlice";
import useProductStore from "@/zustand/productSlice";
import useUserStore from "@/zustand/userSlice";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./index.scss";

const page = () => {
  const { order, removeOrder } = useOrderStore();
  const { removeProduct } = useProductStore();
  const { user, jwt } = useUserStore();
  const useSearch = useSearchParams();
  const status = useSearch?.get("vnp_TransactionStatus");
  const handleOrder1 = async () => {
    const data = {
      customer_id: user?.id,
      products: order,
    };
    if (status === "00") {
      try {
        await axiosPrimary.post("/orders", data, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        removeOrder();
        removeProduct(order);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleOrder1();
  }, [status]);

  return (
    <div className="checkout main">
      <div className="checkout__container">
        {status === "00" ? (
          <h2>Thanh toán thành công!!!</h2>
        ) : (
          <h2>Thanh toán thất bại!!!</h2>
        )}
      </div>
    </div>
  );
};

export default page;

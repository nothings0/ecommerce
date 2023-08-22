"use client";
import React from "react";
import { IResOrderServer } from "@/type";
import qs from "querystring";
import OrderItem from "./OrderItem";
import Link from "next/link";
import useFetchWithPermision from "@/app/Hooks/useFetchWithPermision";
import useUserStore from "@/zustand/userSlice";

interface IProps {
  type: string;
}

const OrderWrap: React.FC<IProps> = ({ type }) => {
  const { jwt } = useUserStore();
  const query = qs.stringify({
    populate: ["order_details.product.picture_cover", "status"],
  });
  const { data: res } = useFetchWithPermision<IResOrderServer>(
    `/orders?${query}${
      type === "all" ? "" : `&filters[status][name][$eq]=${type}`
    }`,
    jwt
  );
  return (
    <>
      {res?.data && (
        <>
          {res?.data.length > 0 ? (
            <>
              {res?.data.map((item) =>
                item.attributes.order_details?.data.map((e) => (
                  <Link href={`/user/order/${item.id}`} key={e.id}>
                    <OrderItem
                      data={e.attributes.product.data}
                      type={item.attributes.status.data.attributes.name}
                      quantity={e.attributes.quantity}
                    />
                  </Link>
                ))
              )}
            </>
          ) : (
            <>
              <p>Không có đơn hàng nào!</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OrderWrap;

"use client";
import React from "react";
import useFetch from "@/app/Hooks/useFetch";
import { IResOrderServer } from "@/type";
import qs from "querystring";
import OrderItem from "./OrderItem";
import Link from "next/link";
import useFetchWithPermision from "@/app/Hooks/useFetchWithPermision";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface IProps {
  type: string;
}

const OrderWrap: React.FC<IProps> = ({ type }) => {
  const { jwt } = useSelector((state: RootState) => state.user);
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
              {res?.data.map((item) => (
                <>
                  {item.attributes.order_details?.data.map((e) => (
                    <Link href={`/user/order/${item.id}`}>
                      <OrderItem
                        data={e.attributes.product.data}
                        type={item.attributes.status.data.attributes.name}
                      />
                    </Link>
                  ))}
                </>
              ))}
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

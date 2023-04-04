"use client";
import React from "react";
import { RootState } from "@/redux/store";
import qs from "querystring";
import useFetchWithPermision from "@/app/Hooks/useFetchWithPermision";
import { useSelector } from "react-redux";
import "./index.scss";
import { IResOrderServer } from "@/type";
import Link from "next/link";
import OrderItem from "@/app/user/order/OrderItem";

const Order = () => {
  const { jwt } = useSelector((state: RootState) => state.user);
  const query = qs.stringify({
    populate: ["order_details.product.picture_cover", "status"],
  });
  const { data: res } = useFetchWithPermision<IResOrderServer>(
    `/orders?${query}&filters[status][name][$eq]=pending`,
    jwt
  );
  return (
    <div className="admin-order">
      <div className="order-header">Dashboard</div>
      <div className="order-container">
        {res?.data && (
          <>
            {res?.data.length > 0 ? (
              <>
                {res?.data.map((item) => (
                  <>
                    {item.attributes.order_details?.data.map((e) => (
                      <Link href={`/admin/order/${item.id}`} key={e.id}>
                        <OrderItem
                          data={e.attributes.product.data}
                          type={item.attributes.status.data.attributes.name}
                          quantity={e.attributes.quantity}
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
      </div>
    </div>
  );
};

export default Order;

"use client";
import React from "react";
import qs from "querystring";
import useFetchWithPermision from "@/app/Hooks/useFetchWithPermision";
import "./index.scss";
import { IResOrderServer } from "@/type";
import Link from "next/link";
import OrderItem from "@/app/user/order/OrderItem";
import useUserStore from "@/zustand/userSlice";

const Order = () => {
  const { jwt } = useUserStore();
  const query = qs.stringify({
    populate: ["order_details.product.picture_cover", "status"],
    "filters[status][name][$eq]": "pending",
  });

  const { data: res } = useFetchWithPermision<IResOrderServer>(
    `/orders?${query}`,
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
                {res?.data.map((item) =>
                  item.attributes.order_details?.data.map((e) => (
                    <Link href={`/admin/order/${item.id}`} key={e.id}>
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
      </div>
    </div>
  );
};

export default Order;

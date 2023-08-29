import Button from "@/components/Button";
import { IOrder } from "@/type";
import { fomatCurrency } from "@/utities";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useOrderStore from "@/zustand/orderSlice";

const PayBox = () => {
  const { order } = useOrderStore();
  const [orderState, setOrderState] = useState<IOrder[]>([]);

  useEffect(() => {
    setOrderState(order);
  }, [orderState, order]);

  const handleTotal = (order: IOrder[]) => {
    let total = 0;
    if (order.length > 0) {
      for (let item of order) {
        total += item.product?.attributes.price! * item.quantity!;
      }
    }
    return total;
  };

  return (
    <div className="main-cart__payment">
      <div className="main-cart__payment-wrap">
        <h3>Thanh toán</h3>
        {orderState.length > 0 ? (
          <p>Có {order.length} sản phẩm</p>
        ) : (
          <p>Chọn sản phẩm để thanh toán</p>
        )}
        <p>Tổng: {fomatCurrency(handleTotal(order))}</p>
        <div className="main-cart__payment-button">
          {orderState.length > 0 ? (
            <Link href="/payment">
              <Button type="primary" size="md">
                Thanh toán
              </Button>
            </Link>
          ) : (
            <Link href="/product">
              <Button type="primary" size="md">
                Mua sắm
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayBox;

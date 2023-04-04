import Button from "@/components/Button";
import { RootState } from "@/redux/store";
import { IOrder } from "@/type";
import { fomatCurrency } from "@/utities";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const PayBox = () => {
  const { order } = useSelector((state: RootState) => state.order);
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
        {order.length > 0 ? (
          <p>Có {order.length} sản phẩm</p>
        ) : (
          <p>Chọn sản phẩm để thanh toán</p>
        )}
        <p>Tổng: {fomatCurrency(handleTotal(order))}</p>
        <div className="main-cart__payment-button">
          {order.length > 0 ? (
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

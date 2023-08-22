"use client";
import React, { useMemo, useState } from "react";
import { fomatCurrency } from "@/utities";
import Image from "next/image";
import Link from "next/link";
import useOrderStore from "@/zustand/orderSlice";

const configPayment = {
  priceShip: 25000,
  promotion: 15000,
  vat: 0.05,
};

const URL = "https://backend-ecommerce-2.onrender.com";
const OrderDetail = () => {
  const { order } = useOrderStore();
  const [active, setActive] = useState<boolean>(false);

  const price = useMemo(() => {
    return order.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.product?.attributes.price! * currentValue.quantity!
      );
    }, 0);
  }, []);

  const totalProduct = useMemo(() => {
    return order.length;
  }, [order]);

  const accumulatorPrice = useMemo(() => {
    return (
      price +
      configPayment.priceShip -
      configPayment.promotion +
      price * configPayment.vat
    );
  }, [order]);

  return (
    <div className="order-detail">
      <div className="order-detail--container">
        <div className="order-detail--top">
          <div className="order-detail--top--header">
            <h3>Đơn hàng</h3>
            <Link href="/cart">Thay đổi</Link>
          </div>
          <div className="order-detail--top--content">
            <div className="order-detail--top--text">
              <p>{totalProduct} sản phẩm</p>
              <span onClick={() => setActive(!active)}>Xem thông tin</span>
            </div>
            <div className={`order-detail--list ${active ? "active" : ""}`}>
              {order.map((item) => (
                <Link
                  href={`/product/${item.product?.id}`}
                  className="order-detail--item"
                  key={item.product?.id}
                >
                  <Image
                    src={`${URL}${item.product?.attributes.picture_cover.data[0].attributes.url}`}
                    alt=""
                    width={`${Number(
                      item.product?.attributes.picture_cover.data[0].attributes
                        .width
                    )}`}
                    height={`${Number(
                      item.product?.attributes.picture_cover.data[0].attributes
                        .height
                    )}`}
                  />
                  <span>{item.product?.attributes.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="order-detail--middle">
          <div className="order-detail--text">
            <p>Tạm tính</p>
            <span>{fomatCurrency(price)}</span>
          </div>
          <div className="order-detail--text">
            <p>Phí vận chuyển</p>
            <span>{fomatCurrency(configPayment.priceShip)}</span>
          </div>
          <div className="order-detail--text">
            <p>Khuyến mãi vận chuyển</p>
            <span>-{fomatCurrency(configPayment.promotion)}</span>
          </div>
          <div className="order-detail--text">
            <p>VAT (5%)</p>
            <span>{fomatCurrency(price * configPayment.vat)}</span>
          </div>
        </div>
        <div className="order-detail--bottom">
          <div className="order-detail--total">
            <h5>Tổng tiền</h5>
            <span>{fomatCurrency(accumulatorPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

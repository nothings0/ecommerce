import React from "react";
import { IProduct } from "@/type";
import Image from "next/image";
import { fomatCurrency } from "@/utities";

interface IProps {
  data: IProduct;
  type: string;
  quantity: number;
}
const URL = "http://127.0.0.1:5432";
const OrderItem: React.FC<IProps> = ({ data, type, quantity }) => {
  return (
    <div className="order-item">
      <div className="order-item--left">
        <div className="order-item--img">
          <Image
            src={`${URL}${data.attributes.picture_cover.data[0].attributes.url}`}
            alt=""
            width={`${Number(
              data.attributes.picture_cover.data[0].attributes.width
            )}`}
            height={`${Number(
              data.attributes.picture_cover.data[0].attributes.height
            )}`}
          />
        </div>
        <div className="order-item--text">
          <h4>{data.attributes.name}</h4>
          <span className={`order-item--text-type ${type}`}>{type}</span>
        </div>
      </div>
      <div className="order-item--right">
        <span>Số lượng: {quantity}</span>
        <span>{fomatCurrency(data.attributes.price * quantity)}</span>
      </div>
    </div>
  );
};

export default OrderItem;

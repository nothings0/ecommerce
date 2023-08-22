"use client";
import React, { useState } from "react";
import useFetchWithPermision from "@/app/Hooks/useFetchWithPermision";
import { IResAOrderServer, IOrderDetail } from "@/type";
import { fomatCurrency } from "@/utities";
import qs from "querystring";
import "./index.scss";
import Image from "next/image";
import Button from "@/components/Button";
import moment from "moment";
import axiosClient from "@/config/axiosConfig";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Link from "next/link";
import useUserStore from "@/zustand/userSlice";

const URL = "https://backend-ecommerce-2.onrender.com";

const OrderDetail = (context: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { slug } = context.params;
  const { jwt, user } = useUserStore();
  const router = useRouter();
  const query = qs.stringify({
    populate: ["order_details.product.picture_cover", "status", "user"],
  });
  const { data: res } = useFetchWithPermision<IResAOrderServer>(
    `/orders/${slug}?${query}`,
    jwt
  );

  const handleTotal = (order: IOrderDetail | undefined) => {
    let total = 0;
    if (order) {
      if (order.data.length > 0) {
        for (let item of order.data) {
          total +=
            item.attributes.product.data.attributes.price *
            item.attributes.quantity;
        }
      }
    }
    return total;
  };

  const handleCancel = async (id: number) => {
    try {
      await axiosClient.put(
        `/orders/${id}`,
        {
          state: 3,
          order: res?.data.attributes.order_details.data,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setOpen(false);
      router.push("/user/order");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order-detail">
      <div className="order-title">
        <div className="order-name">
          Chi tiết đơn hàng #{res?.data.id}-
          {res?.data.attributes.status.data.attributes.name}
        </div>
        <div className="order-time">
          Ngày đặt hàng:{" "}
          {moment(res?.data.attributes.createdAt).format("DD-MM-YYYY")}
        </div>
      </div>
      <div className="order-info">
        <div className="order-info--box">
          <div className="order-info--title">Địa chỉ người nhận</div>
          <div className="order-info--content">
            Địa chỉ: {user?.address.text}
          </div>
        </div>
        <div className="order-info--box">
          <div className="order-info--title">Hình thức giao hàng</div>
          <div className="order-info--content">Fast - giao hàng tiết kiệm</div>
        </div>
        <div className="order-info--box">
          <div className="order-info--title">Hình thức thanh toán</div>
          <div className="order-info--content">
            thanh toán tiền mặt khi nhận hàng
          </div>
        </div>
      </div>
      <div className="order-wrap">
        <div className="order-header">
          <div className="order-header--img">sản phẩm</div>
          <div className="order-header--quantity">số lượng</div>
          <div className="order-header--price">giá</div>
        </div>
        {res?.data.attributes.order_details.data.map((item, index) => (
          <Link
            href={`/product/${item.attributes.product.data.id}`}
            className="order-product"
            key={index}
          >
            <div className="order-product--img">
              <Image
                src={`${URL}${item.attributes.product.data.attributes.picture_cover.data[0].attributes.url}`}
                alt=""
                width={`${Number(
                  item.attributes.product.data.attributes.picture_cover.data[0]
                    .attributes.width
                )}`}
                height={`${Number(
                  item.attributes.product.data.attributes.picture_cover.data[0]
                    .attributes.height
                )}`}
              />
            </div>
            <div className="order-product--name">
              {item.attributes.product.data.attributes.name}
            </div>
            <div className="order-product--quantity">
              {item.attributes.quantity}
            </div>
            <div className="order-product--price">
              {fomatCurrency(item.attributes.product.data.attributes.price)}
            </div>
          </Link>
        ))}
      </div>
      <div className="order-button">
        <div className="total">
          Tổng: {fomatCurrency(handleTotal(res?.data.attributes.order_details))}
        </div>
        {["success", "faild"].includes(
          res?.data.attributes.status.data.attributes.name!
        ) ? (
          <Button type="primary" size="md">
            <Link href="/product">Mua sắm</Link>
          </Button>
        ) : (
          <Button type="cancel" size="md" OnClick={() => setOpen(true)}>
            Hủy
          </Button>
        )}
      </div>

      <Modal
        title="Huỷ đơn hàng"
        isOpen={isOpen}
        onOk={() => handleCancel(res?.data.id!)}
        onCancel={setOpen}
        onOpen={setOpen}
      >
        <p>Bạn có muốn hủy đơn hàng này không?</p>
      </Modal>
    </div>
  );
};

export default OrderDetail;

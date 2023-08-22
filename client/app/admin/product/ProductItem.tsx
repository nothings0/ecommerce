"use client";
import { IProduct } from "@/type";
import Image from "next/image";
import React, { useState } from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { fomatCurrency } from "@/utities";
import Link from "next/link";
import Modal from "@/components/Modal";

interface IProps {
  product: IProduct;
  onHandleDelete: (id: number) => void;
}
const URL = "https://backend-ecommerce-2.onrender.com";
const ProductItem: React.FC<IProps> = ({ product, onHandleDelete }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const onHandleDeleteA = () => {
    setOpen(false);
    onHandleDelete(product.id);
  };

  return (
    <div className="product-item">
      <div className="product-item--img">
        <Image
          alt="product image"
          src={`${URL}${product.attributes.picture_cover.data[0].attributes.url}`}
          width={`${Number(
            product.attributes.picture_cover.data[0].attributes.width
          )}`}
          height={`${Number(
            product.attributes.picture_cover.data[0].attributes.height
          )}`}
        />
      </div>
      <div className="product-item--name">{product.attributes.name}</div>
      <div className="product-item--price">
        {fomatCurrency(product.attributes.price)}
      </div>
      <div className="product-item--btn">
        <Link href={`/admin/edit/${product.id}`}>
          <div className="icon">
            <BsPencilSquare />
          </div>
        </Link>
        <div className="icon" onClick={() => setOpen(true)}>
          <BsTrash />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpen={setOpen}
        title="Xóa người dùng"
        onOk={onHandleDeleteA}
        onCancel={() => setOpen(false)}
      >
        <p>
          Dữ liệu sản phẩm xóa sẽ không thể khôi phục. Bạn có muốn xóa không ?
        </p>
      </Modal>
    </div>
  );
};

export default ProductItem;

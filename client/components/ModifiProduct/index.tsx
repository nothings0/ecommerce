"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import "./index.scss";
import Image from "next/image";
import axiosClient from "@/config/axiosConfig";
import { useRouter } from "next/navigation";
import { IResSupplier, IResCategory, IProduct } from "@/type";
import useFetch from "@/app/Hooks/useFetch";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import dynamic from "next/dynamic";
import useUserStore from "@/zustand/userSlice";
import Loading from "../Skeleton";

interface IProducts {
  name: string | undefined;
  description: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
  supplier_id: number | undefined;
  category_id: number | undefined;
  picture_cover: string | undefined;
  html: string | undefined;
}

interface IProps {
  props?: IProduct;
}
const BASE_URL = "https://backend-ecommerce-2.onrender.com";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Modify: React.FC<IProps> = ({ props }) => {
  const { jwt } = useUserStore();
  const router = useRouter();
  const [thumb, setThumb] = useState<File>();
  const [product, setProduct] = useState<IProducts>({
    name: props?.attributes.name,
    description: props?.attributes.description,
    category_id: props?.attributes.category_id.data.id,
    picture_cover: props?.attributes.picture_cover.data[0].attributes.url,
    price: props?.attributes.price,
    quantity: props?.attributes.quantity,
    supplier_id: props?.attributes.supplier_id.data.id,
    html: props?.attributes.html,
  });
  const { data: categories, isLoading } = useFetch<IResCategory>(
    "category",
    `categories`
  );
  const { data: suppliers } = useFetch<IResSupplier>("supplier", `suppliers`);

  useEffect(() => {
    return () => {
      thumb && URL.revokeObjectURL(URL.createObjectURL(thumb));
    };
  }, [thumb]);

  const handleChangeAva = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setThumb(e.target.files[0]);
  };

  function handleEditorChange({ html, text }: any) {
    setProduct((product) => ({ ...product, html: text }));
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProduct((product) => ({ ...product, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("files", thumb!);
      const res = await axiosClient.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = { ...product, picture_cover: res.data[0].id };
      await axiosClient.post(
        `/products`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="modify">
      <div className="modify-header">
        <h4 className="modify-header--heading">
          {props ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm"}
        </h4>
        <div className="modify-header--button">
          <Button type="primary" size="md" OnClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </div>
      <div className="modify-container">
        <div className="modify-text">
          <div className="modify-title">
            <label htmlFor="title">Tên sản phẩm (bắt buộc)</label>
            <textarea
              id="title"
              placeholder="Nhập tên sản phẩm"
              name="name"
              onChange={handleChange}
              value={product.name}
            />
          </div>
          <div className="modify-input">
            <div className="modify-input--box">
              <label htmlFor="price">Giá</label>
              <input
                type="text"
                id="price"
                placeholder="giá..."
                name="price"
                onChange={handleChange}
                value={product.price}
              />
            </div>
            <div className="modify-input--box">
              <label htmlFor="quantity">Tổng kho</label>
              <input
                type="text"
                id="quantity"
                placeholder="Tổng kho..."
                name="quantity"
                onChange={handleChange}
                value={product.quantity}
              />
            </div>
            <div className="modify-input--box">
              <label htmlFor="supplier_id">Hãng</label>
              <select
                id="supplier_id"
                placeholder="Hãng..."
                name="supplier_id"
                onChange={handleChange}
                value={product.supplier_id}
              >
                <option value="">Chọn hãng sản xuất</option>
                {suppliers?.data.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.attributes.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modify-input--box">
              <label htmlFor="category_id">Danh mục</label>
              <select
                id="category_id"
                placeholder="Danh mục..."
                name="category_id"
                onChange={handleChange}
                value={product.category_id}
              >
                <option value="">Chọn danh mục sản phẩm</option>
                {categories?.data.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modify-desc">
            <label htmlFor="description">Chi tiết sản phẩm sản phẩm</label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={product.html}
            />
          </div>
        </div>
        <div className="modify-img">
          <label htmlFor="picture_cover">Chọn ảnh</label>
          <input
            type="file"
            name="picture_cover"
            id="picture_cover"
            onChange={handleChangeAva}
          />
          {thumb ? (
            <div className="modify-img--thumb">
              <Image
                src={URL.createObjectURL(thumb)}
                alt="thumbnail"
                width={100}
                height={60}
              />
            </div>
          ) : (
            <div className="modify-img--thumb">
              {product.picture_cover && (
                <Image
                  src={`${BASE_URL}${product.picture_cover}`}
                  alt="thumbnail"
                  width={100}
                  height={60}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modify;

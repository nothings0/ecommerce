"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./cart.scss";
import Link from "next/link";
import useProductStore from "@/zustand/productSlice";
const Cart = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const { cart } = useProductStore();
  useEffect(() => {
    setQuantity(cart.length);
  }, [cart.length]);

  return (
    <Link href="/cart">
      <div className="cart">
        <AiOutlineShoppingCart size={25} />
        <span>{quantity}</span>
      </div>
    </Link>
  );
};

export default Cart;

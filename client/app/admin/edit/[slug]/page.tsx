"use client";
import React from "react";
import Modify from "@/components/ModifiProduct";
import useFetch from "@/app/Hooks/useFetch";
import { IResSimpleProduct } from "@/type";

const Edit = (context: any) => {
  const { slug } = context.params;
  const { data: res } = useFetch<IResSimpleProduct>(
    `product/${slug}`,
    `products/${slug}?populate=*`
  );
  const product = res?.data;
  return <>{product && <Modify props={product} />}</>;
};

export default Edit;

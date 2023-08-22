"use client";
import React from "react";
import Modify from "@/components/ModifiProduct";
import useFetch from "@/app/Hooks/useFetch";
import { IResSimpleProduct } from "@/type";
import Loading from "@/app/loading";

const Edit = (context: any) => {
  const { slug } = context.params;
  const { data: res, isLoading } = useFetch<IResSimpleProduct>(
    `product/${slug}`,
    `products/${slug}?populate=*`
  );
  const product = res?.data;
  if (isLoading) return <Loading />;
  return <>{product && <Modify props={product} />}</>;
};

export default Edit;

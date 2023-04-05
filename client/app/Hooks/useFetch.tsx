"use client";
import axiosClient from "@/config/axiosConfig";
import { useEffect, useMemo, useState } from "react";

export default function useFetch<T = unknown>(path: string) {
  const cache: { [key: string]: T } = {};
  const [data, setData] = useState<T | null>(null);

  const cachedData = useMemo(() => cache[path] ?? null, [path]);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      return;
    }
    const getProduct = async () => {
      const res = await axiosClient.get(`/${path}`);
      const resData: T = res.data;
      cache[path] = resData;
      setData(resData);
    };
    getProduct();
  }, [path, cachedData]);
  return {
    data,
  };
}

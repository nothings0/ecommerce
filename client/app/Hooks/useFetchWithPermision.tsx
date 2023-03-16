"use client";
import { useEffect, useMemo, useState } from "react";
import axiosClient from "@/config/axiosConfig";

export default function useFetchWithPermision<T = unknown>(
  path: string,
  jwt: string | null
) {
  const cache: { [key: string]: T } = {};
  const [data, setData] = useState<T | null>(null);

  const cachedData = useMemo(() => cache[path] ?? null, [path]);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      return;
    }
    const getProduct = async () => {
      const res = await axiosClient.get(`${path}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      cache[path] = res.data;
      setData(res.data);
    };
    getProduct();
  }, [path, cachedData]);
  return {
    data,
  };
}

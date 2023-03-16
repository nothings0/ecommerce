"use client";
import { useEffect, useMemo, useState } from "react";

const URL = "http://127.0.0.1:1337/api/";
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
      const res = await fetch(`${URL}${path}`);
      const resData: T = await res.json();
      cache[path] = resData;
      setData(resData);
    };
    getProduct();
  }, [path, cachedData]);
  return {
    data,
  };
}

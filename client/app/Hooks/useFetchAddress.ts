"use client";
import { useEffect, useState } from "react";

export default function useFetchAddress<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${path}`);
      const resData: T = await res.json();
      setData(resData);
    };
    getData();
  }, [path]);
  return {
    data,
  };
}

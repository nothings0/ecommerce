"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchAddress<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:3000${path}`);
      const resData: T = res.data;
      setData(resData);
    };
    getData();
  }, [path]);
  return {
    data,
  };
}

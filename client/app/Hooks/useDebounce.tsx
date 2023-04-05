import axiosClient from "@/config/axiosConfig";
import { useEffect, useCallback, useState } from "react";
const URL = "http://127.0.0.1:1337/api/";
export default function useDebounce<T = unknown>(path: string, delay: number) {
  const [data, setData] = useState<T | null>(null);
  const fetchData = async () => {
    if (!path) return;
    const res = await axiosClient.get(`${path}`);
    const resData: T = res.data;
    setData(resData);
  };
  const callback = useCallback(fetchData, [path, delay]);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
  return {
    data,
  };
}

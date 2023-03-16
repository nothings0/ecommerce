import { useEffect, useCallback, useState } from "react";
const URL = "http://127.0.0.1:1337/api/";
export default function useDebounce<T = unknown>(path: string, delay: number) {
  const [data, setData] = useState<T | null>(null);
  const fetchData = async () => {
    if (!path) return;
    const res = await fetch(`${URL}${path}`);
    const resData: T = await res.json();
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

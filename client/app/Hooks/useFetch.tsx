"use client";
import axiosClient from "@/config/axiosConfig";
import { useQuery } from "react-query";

export default function useFetch<T = unknown>(
  key: string,
  path: string,
  option?: {}
) {
  const fetch = async (): Promise<T> => {
    const res = await axiosClient.get(`?${path}`);
    return res.data;
  };

  return useQuery({
    queryKey: key,
    queryFn: () => fetch(),
    ...option,
  });
}

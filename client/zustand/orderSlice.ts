import { IProduct } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ITypeInitState {
  order: {
    product: IProduct | null;
    quantity: number | null;
  }[];
  setNewOrder: (
    payload: { product: IProduct | null; quantity: number | null }[]
  ) => void;
}

const useOrderStore = create<ITypeInitState>()(
  persist(
    (set) => ({
      order: [],
      setNewOrder: (payload) => set(() => ({ order: payload })),
    }),
    {
      name: "order",
    }
  )
);

export default useOrderStore;

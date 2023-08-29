import { IOrder } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ITypeInitState {
  order: IOrder[];
  deliveryType: {
    text: string;
    id: number;
  };
  setDeliveryType: (payload: { text: string; id: number }) => void;
  setNewOrder: (payload: IOrder[]) => void;
  removeOrder: () => void;
}

const useOrderStore = create<ITypeInitState>()(
  persist(
    (set) => ({
      order: [],
      deliveryType: {
        id: 0,
        text: "Thanh toán khi nhận hàng",
      },
      setDeliveryType: (payload) => set(() => ({ deliveryType: payload })),
      setNewOrder: (payload) => set(() => ({ order: payload })),
      removeOrder: () => set(() => ({ order: [] })),
    }),
    {
      name: "order",
    }
  )
);

export default useOrderStore;

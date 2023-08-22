import { create } from "zustand";
import { IOrder, IProduct } from "@/type";
import { checkAndModifyArray } from "@/utities";
import { persist } from "zustand/middleware";

interface ITypeInitState {
  supplier: string;
  category: string;
  cart: IProduct[];
  wishlist: IProduct[];
  setSupplier: (payload: string) => void;
  setCategory: (payload: string) => void;
  setCart: (payload: IProduct) => void;
  removeProduct: (payload: IOrder[]) => void;
  removeCart: (payload: IProduct[]) => void;
  setWishList: (payload: IProduct) => void;
}

const useProductStore = create<ITypeInitState>()(
  persist(
    (set) => ({
      supplier: "",
      category: "",
      cart: [],
      wishlist: [],
      setSupplier: (payload) => set(() => ({ supplier: payload })),
      setCategory: (payload) => set(() => ({ category: payload })),
      setCart: (payload) =>
        set((state) => ({ cart: checkAndModifyArray(state.cart, payload) })),
      removeProduct: (payload) =>
        set((state) => {
          const newCarts = state.cart.filter((item1) =>
            payload.every((item2) => item2.product?.id !== item1.id)
          );
          return { cart: newCarts };
        }),
      removeCart: (payload) =>
        set((state) => {
          const newCarts = state.cart.filter((item1) =>
            payload.every((item2) => item2.id !== item1.id)
          );
          return { cart: newCarts };
        }),
      setWishList: (payload) =>
        set((state) => ({
          wishlist: checkAndModifyArray(state.wishlist, payload),
        })),
    }),
    {
      name: "product",
    }
  )
);

export default useProductStore;

import { IOrder, IProduct } from "@/type";
import { checkAndModifyArray } from "@/utities";
import { createSlice } from "@reduxjs/toolkit";

interface ITypeInitState {
  supplier: string;
  category: string;
  cart: IProduct[];
  wishlist: IProduct[];
}

const initialState: ITypeInitState = {
  supplier: "",
  category: "",
  cart: [],
  wishlist: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,

  reducers: {
    setSupplier: (state, actions) => {
      state.supplier = actions.payload;
    },
    setCart: (state, actions) => {
      checkAndModifyArray(state.cart, actions.payload);
    },
    setCategory: (state, actions) => {
      state.category = actions.payload;
    },
    removeProduct: (state, actions) => {
      const order: IOrder[] = actions.payload;
      const oldCart = state.cart;
      const newCarts = oldCart.filter((item1) =>
        order.every((item2) => item2.product?.id !== item1.id)
      );
      state.cart = newCarts;
    },
    removeCart: (state, actions) => {
      const products: IProduct[] = actions.payload;
      const oldProducts = state.cart;
      const newCarts = oldProducts.filter((item1) =>
        products.every((item2) => item2.id !== item1.id)
      );
      state.cart = newCarts;
    },
    setWishList: (state, actions) => {
      checkAndModifyArray(state.wishlist, actions.payload);
    },
  },
});

export const {
  setSupplier,
  setCart,
  setCategory,
  removeProduct,
  removeCart,
  setWishList,
} = productSlice.actions;
export default productSlice.reducer;

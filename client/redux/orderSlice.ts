import { IOrder, IProduct } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

interface ITypeInitState {
  order: {
    product: IProduct | null;
    quantity: number | null;
  }[];
}

const initialState: ITypeInitState = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,

  reducers: {
    setNewOrder: (state, actions) => {
      state.order = actions.payload;
    },
  },
});

export const { setNewOrder } = orderSlice.actions;
export default orderSlice.reducer;

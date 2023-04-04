import { createSlice } from "@reduxjs/toolkit";

interface ITypeInitState {
  user: {
    username: string;
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    updatedAt: string;
    email: string;
    phone_number: string;
    address: {
      text: string;
      code: string;
    };
    name: string;
    id: number;
    provider: "local" | "public";
  } | null;
  jwt: string | null;
}

const initialState: ITypeInitState = {
  user: null,
  jwt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    handleLogin: (state, actions) => {
      state.user = actions.payload.user;
      state.jwt = actions.payload.jwt;
    },
    handleLogout: (state) => {
      state.user = null;
      state.jwt = null;
    },
    handleUpdate: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { handleLogin, handleLogout, handleUpdate } = userSlice.actions;
export default userSlice.reducer;

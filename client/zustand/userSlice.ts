import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface IUserSlice extends ITypeInitState {
  handleLogin: (payload: any) => void;
  handleLogout: () => void;
  handleUpdate: (payload: any) => void;
}

const useUserStore = create<IUserSlice>()(
  persist(
    (set) => ({
      ...initialState,

      handleLogin: (payload) =>
        set((state) => ({
          jwt: payload.jwt,
          user: payload.user,
        })),
      handleLogout: () =>
        set(() => ({
          user: null,
          jwt: null,
        })),
      handleUpdate: (payload) =>
        set((state) => ({
          ...state,
          user: payload,
        })),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;

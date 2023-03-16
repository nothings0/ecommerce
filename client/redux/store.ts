/// <reference types="redux-persist" />
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["order"],
};

const rootReducer = combineReducers({
  product: productSlice,
  order: orderSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);

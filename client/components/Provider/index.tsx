"use client";
import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ThemeProvider;

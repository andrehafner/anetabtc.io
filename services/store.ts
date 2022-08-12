import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "@reducers/app";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;

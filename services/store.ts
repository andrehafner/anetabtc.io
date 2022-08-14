import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import app from "@reducers/app";
import cardano from "@reducers/cardano";
import ergo from "@reducers/ergo";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    app: app,
    cardano: cardano,
    ergo: ergo,
  },
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;

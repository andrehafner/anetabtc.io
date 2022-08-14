import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import app from '@reducers/app'
import cardano from "@reducers/cardano";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    app: app,
    cardano: cardano,
  },
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;

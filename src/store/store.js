import { configureStore } from "@reduxjs/toolkit";

// SLICES
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    categoryStore: categorySlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

// SLICES
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import favouritesSlice from "./favouritesSlice";

const store = configureStore({
  reducer: {
    categoryStore: categorySlice,
    productStore: productSlice,
    cartStore: cartSlice,
    favouritesStore: favouritesSlice,
  },
});

export default store;

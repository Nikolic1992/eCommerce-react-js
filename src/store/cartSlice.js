import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProduct: 0,
    totalPrice: 0,
  },
  reducers: {
    // SEND ITEM FROM CART
    saveInCartAction: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex === -1) {
        state.cart.push({ ...action.payload });
        state.totalProduct += 1;
        state.totalPrice =
          Math.round((state.totalPrice + action.payload.totalItemPrice) * 100) /
          100;
      } else {
        const existingProduct = state.cart[existingProductIndex];
        existingProduct.quantity += action.payload.quantity;
        existingProduct.totalItemPrice =
          Math.round(existingProduct.price * existingProduct.quantity * 100) /
          100;

        state.totalPrice =
          Math.round((state.totalPrice + action.payload.totalItemPrice) * 100) /
          100;
      }
    },

    // DELETE ITEM FROM CART
    deleteFromCartAction: (state, action) => {
      const productIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        state.totalPrice =
          Math.round((state.totalPrice - product.totalItemPrice) * 100) / 100;
        state.totalProduct -= 1;
        state.cart.splice(productIndex, 1);
      }
    },

    // INCREASE QUANTITY & PRICE BOTH IN CartPage.jsx AND IN SingleProductPage.jsx
    increaseQuantityAction: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
        product.totalItemPrice =
          Math.round(product.price * product.quantity * 100) / 100;
        state.totalPrice =
          Math.round((state.totalPrice + product.price) * 100) / 100;
      }
    },

    // DECREASE QUANTITY & PRICE BOTH IN CartPage.jsx AND IN SingleProductPage.jsx
    decreaseQuantityAction: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.totalItemPrice =
          Math.round(product.price * product.quantity * 100) / 100;
        state.totalPrice =
          Math.round((state.totalPrice - product.price) * 100) / 100;
      }
    },
  },
});

export const {
  saveInCartAction,
  deleteFromCartAction,
  increaseQuantityAction,
  decreaseQuantityAction,
} = cartSlice.actions;
export default cartSlice.reducer;

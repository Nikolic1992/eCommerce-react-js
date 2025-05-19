import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProduct: 0,
  },
  reducers: {
    saveInCartAction: (state, action) => {
      let cartCopy = [...state.cart];

      // FIND INDEX - DUPLICATES
      let findIndex = null;

      cartCopy.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null) {
        cartCopy.push({
          ...action.payload,
          count: 1,
          cartTotal: action.payload.price,
        });
        state.totalProduct++;
      } else {
        cartCopy[findIndex].count++;
      }

      state.cart = cartCopy;
    },
    deleteFromCartAction: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { saveInCartAction, deleteFromCartAction } = cartSlice.actions;
export default cartSlice.reducer;

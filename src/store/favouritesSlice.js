import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    allFavourites: [],
  },
  reducers: {
    toggleFavouriteAction: (state, action) => {
      const product = action.payload;
      const existingIndex = state.allFavourites.findIndex(
        (p) => p.id === product.id
      );

      if (existingIndex >= 0) {
        state.allFavourites.splice(existingIndex, 1);
      } else {
        state.allFavourites.push(product);
      }
    },
    updateFavouritesAction: (state, action) => {
      state.allFavourites = action.payload;
    },
  },
});

export const { toggleFavouriteAction, updateFavouritesAction } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;

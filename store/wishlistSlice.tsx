import { createSlice } from '@reduxjs/toolkit';

interface State {
  items:
    | {
        category: string;
        composition: string[];
        price: number;
        src: string[];
        name: string;
        id: string;
        quantity: number;
        description?: string;
        size?: string | number;
        sizes?: string[] | number[];
        sizeGuide?: string[] | string;
      }[];
}

interface Action {
  payload: {
    category: string;
    composition: string[];
    price: number;
    src: string[];
    name: string;
    id: string;
    quantity: number;
    size?: string | number;
    description?: string;
    sizes?: string[] | number[];
    sizeGuide?: string[] | string;
  };
}

const initialState: State = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state: State, action: Action) {
      const item = action.payload;
      const itemName = item.name;
      const duplicate = state.items.find((item) => item.name === itemName);
      if (!duplicate) {
        state.items = state.items.concat(item);
      }
    },
    removeFromWishlist(state: State, action: Action) {
      const item = action.payload;
      const itemName = item.name;
      const itemSize = item.size;
      if (!itemSize) {
        state.items = state.items.filter((item) => item.name !== itemName);
      }
      if (itemSize) {
        state.items = state.items.filter(
          (item) => item.name !== itemName && item.size !== itemSize
        );
      }
    },
    increaseQuantity(state, action) {
      const itemName = action.payload.itemName;
      const itemSize = action.payload.itemSize;
      const item = state.items.find(
        (item) => item.name === itemName && item.size === itemSize
      );
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const itemName = action.payload.itemName;
      const itemSize = action.payload.itemSize;
      const item = state.items.find(
        (item) => item.name === itemName && item.size === itemSize
      );
      if (item) item.quantity -= 1;
    },
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;

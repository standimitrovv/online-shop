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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state: State, action: Action) {
      const item = action.payload;
      const itemName = item.name;
      const itemSize = item.size;
      const duplicate = state.items.find(
        (item) => item.name === itemName && item.size === itemSize
      );
      if (!duplicate) {
        state.items = state.items.concat(item);
      }
      if (duplicate) {
        duplicate.quantity++;
      }
    },
    removeFromCart(state: State, action: Action) {
      const item = action.payload;
      const itemId = item.id;
      const itemSize = item.size;
      const duplicatingItem = state.items.filter((item) => item.id === itemId);
      const duplicatingSize = state.items.filter(
        (item) => item.size === itemSize
      );

      if (duplicatingItem.length > 1) {
        state.items = state.items.filter((item) => item.size !== itemSize);
      }
      if (duplicatingSize.length > 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      }
      if (duplicatingItem.length === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    increaseQuantity(state: State, action) {
      const itemName = action.payload.itemName;
      const itemSize = action.payload.itemSize;
      const item = state.items.find(
        (item) => item.name === itemName && item.size === itemSize
      );
      if (item) item.quantity = item.quantity + 1;
    },
    decreaseQuantity(state: State, action) {
      const itemName = action.payload.itemName;
      const itemSize = action.payload.itemSize;
      const item = state.items.find(
        (item) => item.name === itemName && item.size === itemSize
      );
      if (item) item.quantity = item.quantity - 1;
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;

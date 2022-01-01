import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import wishlistSlice from './wishlistSlice';

const store = configureStore({
  reducer: { cart: cartSlice.reducer, wishlist: wishlistSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

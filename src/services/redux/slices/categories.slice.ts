import { createSlice } from '@reduxjs/toolkit';

interface Category {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState: initialState,
  reducers: {
    storeUpdate: (state, action) => {
      return [...state, action.payload];
    },
    storeReset: () => {
      return initialState;
    },
  },
});

export const { storeUpdate, storeReset } = categoriesSlice.actions;

export default categoriesSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './slices/auth.slice';
import categoriesReducer from './slices/categories.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
});

export default store;

// Typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

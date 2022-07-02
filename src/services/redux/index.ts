import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './slices/auth.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// Typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

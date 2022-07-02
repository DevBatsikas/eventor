import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  uid: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    storeLogin: (state, action) => {
      return { loggedIn: true, uid: action.payload };
    },
    storeLogout: () => {
      return initialState;
    },
  },
});

export const { storeLogin, storeLogout } = authSlice.actions;

export default authSlice.reducer;

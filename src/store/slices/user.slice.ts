import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  refreshToken: '',
  accessToken: '',
  money: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },

  extraReducers: () => {},
});

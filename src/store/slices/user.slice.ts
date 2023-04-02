import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  refreshToken: '',
  accessToken: '',
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
  },
  extraReducers: () => {},
});

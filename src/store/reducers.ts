import { combineReducers } from '@reduxjs/toolkit';
import { orderSlice } from './slices';
import { userSlice } from './slices/user.slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Order {
  orderId: string;
  start: Coordinate;
  end: Coordinate;
  price: number;
}

interface OrderState {
  orders: Order[];
  deliveries: Order[];
}
const initialState: OrderState = {
  orders: [],
  deliveries: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index <= -1) return;

      state.deliveries.push(state.orders[index]);
      state.orders.splice(index, 1);
    },
    rejectOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index <= -1) return;

      state.orders.splice(index, 1);
    },
  },
});

import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Order } from '../../store/slices';
import { EachOrder } from './each-order';

interface OrdersProps {
  orders: Order[];
}

export const Orders = ({ orders }: OrdersProps) => {
  const renderItem: ListRenderItem<Order> = ({ item: order }) => {
    return <EachOrder order={order} />;
  };
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.orderId}
      renderItem={renderItem}
    />
  );
};

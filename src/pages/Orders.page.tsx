import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Orders } from '../feature/orders';
import { RootState } from '../store/reducers';

const OrdersPage = () => {
  const orders = useSelector<RootState>(state => state.order.orders);

  return (
    <View style={styles.container}>
      <Orders orders={orders} />
    </View>
  );
};

export default OrdersPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import CompletePage from './Complete.page';
import IngPage from './Ing.page';

type StackListParam = {
  Ing: undefined;
  Complete: { orderId: string };
};

const Stack = createNativeStackNavigator<StackListParam>();

const DeliveryPage = () => {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen name="Ing" component={IngPage} />
      <Stack.Screen name="Complete" component={CompletePage} />
    </Stack.Navigator>
  );
};

export default DeliveryPage;

const styles = StyleSheet.create({});

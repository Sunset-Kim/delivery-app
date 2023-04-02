import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import DeliveryPage from './src/pages/Delivery.page';
import OrdersPage from './src/pages/Orders.page';
import SettingsPage from './src/pages/Settings.page';
import SignInPage from './src/pages/SignIn.page';
import SignUpPage from './src/pages/SignUp.page';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
  Ing: undefined;
};

const Tab = createBottomTabNavigator<LoggedInParamList>();

const TabScreens: {
  name: keyof LoggedInParamList;
  component: () => JSX.Element;
}[] = [
  {
    name: 'Orders',
    component: OrdersPage,
  },
  {
    name: 'Settings',
    component: SettingsPage,
  },
  {
    name: 'Delivery',
    component: DeliveryPage,
  },
];
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          {TabScreens.map(screen => (
            <Tab.Screen name={screen.name} component={screen.component} />
          ))}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;

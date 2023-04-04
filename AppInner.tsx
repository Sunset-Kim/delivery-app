import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
import { LoggedInParamList, RootStackParamList } from './App';
import { CONFIG } from './src/feature/common/config';
import useSocket from './src/feature/socket/hooks/use-socket';
import DeliveryPage from './src/pages/Delivery.page';
import OrdersPage from './src/pages/Orders.page';
import SettingsPage from './src/pages/Settings.page';
import SignInPage from './src/pages/SignIn.page';
import SignUpPage from './src/pages/SignUp.page';
import { useAppDispatch } from './src/store';
import { RootState } from './src/store/reducers';
import { orderSlice } from './src/store/slices';
import { userSlice } from './src/store/slices/user.slice';

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

const AppInner = () => {
  const a = Config.API_URL;
  console.log(a);
  const isLoggedIn = useSelector<RootState>(state => !!state.user.email);
  const dispatch = useAppDispatch();

  const [socket, disconnect] = useSocket();

  const setOrder = useCallback(
    (data: any) => {
      console.log(data);
      dispatch(orderSlice.actions.addOrder(data));
    },
    [dispatch],
  );

  useEffect(() => {
    getTokenAndRefresh();

    async function getTokenAndRefresh() {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }

        const { data } = await axios.post(
          `${CONFIG.API_URL}/refreshToken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        dispatch(
          userSlice.actions.setUser({
            name: data.data.name,
            email: data.data.email,
            accessToken: data.data.accessToken,
          }),
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          Alert.alert('알림', '다시 로그인 해주세요');
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (socket && isLoggedIn) {
      console.log('socket start');
      socket.emit('acceptOrder', 'hello');
      socket.on('order', setOrder);
    }
    return () => {
      if (socket) {
        socket.off('hello', setOrder);
      }
    };
  }, [disconnect, socket, setOrder, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('logout');
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

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
};

export default AppInner;

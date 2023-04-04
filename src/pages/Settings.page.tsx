import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CONFIG } from '../feature/common/config';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducers';
import { userSlice } from '../store/slices';

const SettingsPage = () => {
  const token = useSelector<RootState>(state => state.user.accessToken);
  const money = useSelector<RootState>(state => state.user.money);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getMoney();

    async function getMoney() {
      try {
        const response = await axios.get<{ data: number }>(
          `${CONFIG.API_URL}/showmethemoney`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        dispatch(userSlice.actions.setMoney(response.data.data));
      } catch (error) {
        if (error instanceof AxiosError) {
          Alert.alert('알림', '에러가 발생했습니다');
        }
      }
    }
  }, [dispatch, token]);
  return (
    <View>
      <Text>SettingsPage</Text>
      <Text>{money}</Text>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({});

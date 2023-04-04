import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LoggedInParamList } from '../../../App';
import { useAppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { Order, orderSlice } from '../../store/slices';
import { CONFIG } from '../common/config';

interface EachOrderProps {
  order: Order;
}

export const EachOrder: React.FC<EachOrderProps> = ({ order }) => {
  const { end, orderId, price, start } = order;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = useSelector<RootState>(state => state.user.accessToken);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const onAccept = useCallback(
    async id => {
      try {
        setLoading(true);

        await axios.post(
          `${CONFIG.API_URL}/accept`,
          {
            orderId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setLoading(false);
        navigation.navigate('Delivery');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          Alert.alert(
            '알림',
            error.response?.data.message ?? '서버에서 에러가 발생했습니다',
          );
        }

        setLoading(false);
      }
      dispatch(orderSlice.actions.acceptOrder(id));
    },
    [dispatch, accessToken, setLoading, navigation],
  );

  const onReject = useCallback(
    id => {
      dispatch(orderSlice.actions.rejectOrder(id));
    },
    [dispatch],
  );

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          setIsOpen(prev => !prev);
        }}>
        <Text>{orderId}</Text>
        <Text>{price}</Text>
      </Pressable>
      {isOpen && (
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.acceptButton]}
            onPress={() => onAccept(orderId)}>
            <Text>수락</Text>
          </Pressable>
          <Pressable onPress={() => onReject(orderId)}>
            <Text>거절</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'dodgerblue',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: 'crimson',
  },
});

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';

import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { DismissKeyBoardView } from '../feature/ui/dismiss-keyboard';
import { useInput } from '../feature/ui/hooks';
import { TextField } from '../feature/ui/text-field';
import { useAppDispatch } from '../store';
import { userSlice } from '../store/slices/user.slice';

const SignInPage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignIn'>) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const dispatch = useAppDispatch();

  const isValidEmail = email && email.trim() !== '';
  const isValidPassword = password && password.trim() !== '';

  const isValid = isValidEmail && isValidPassword;

  const onSubmit = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password,
      });

      const {
        name,
        email: resEmail,
        accessToken,
        refreshToken,
      } = response.data.data;
      setLoading(false);

      dispatch(
        userSlice.actions.setUser({
          name,
          email: resEmail,
          accessToken,
        }),
      );

      await EncryptedStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('로그인', error.response?.data.message ?? '알수없는 에러');
      }
      setLoading(false);
    }
  }, [email, password, loading, dispatch]);

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <DismissKeyBoardView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextField
            ref={emailRef}
            autoCapitalize="none"
            placeholder="아이디를 입력하세요"
            label="아이디"
            value={email}
            onChangeText={setEmail}
            importantForAutofill="yes"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            keyboardType="email-address"
          />
          <TextField
            label="비밀번호"
            autoCapitalize="none"
            ref={passwordRef}
            secureTextEntry
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
            importantForAutofill="yes"
            onSubmitEditing={onSubmit}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.submitButton]}
            onPress={onSubmit}
            disabled={!isValid}>
            <Text>로그인</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.submitButton]}
            onPress={goToSignUp}>
            <Text>회원가입하기</Text>
          </Pressable>
        </View>
      </View>
    </DismissKeyBoardView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 90,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  form: {
    flex: 1,
  },
  buttonContainer: {},
  button: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    marginBottom: 8,

    backgroundColor: 'tomato',
  },
});

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { RootStackParamList } from '../../App';
import { DismissKeyBoardView } from '../feature/ui/dismiss-keyboard';
import { useInput } from '../feature/ui/hooks';
import { TextField } from '../feature/ui/text-field';

const SignUpPage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [name, setName] = useInput('');

  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const isValidEmail = email && email.trim() !== '';
  const isValidPassword = password && password.trim() !== '';
  const isValid = isValidEmail && isValidPassword;

  const onSubmit = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/user`, {
        email,
        name,
        password,
      });

      console.log(response);
      Alert.alert('알림', '회원가입 완료');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Alert.alert(
          '네트워크 에러',
          error.response?.data.message ?? '알수없는 에러가 발생했습니다',
        );
      }
    } finally {
      setLoading(false);
    }
  }, [email, name, loading, password, navigation]);

  return (
    <DismissKeyBoardView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextField
            ref={emailRef}
            placeholder="아이디를 입력하세요"
            autoCapitalize="none"
            label="아이디"
            value={email}
            onChangeText={setEmail}
            importantForAutofill="yes"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
            keyboardType="email-address"
          />
          <TextField
            label="이름"
            autoCapitalize="none"
            ref={nameRef}
            placeholder="이름를 입력하세요"
            value={name}
            onChangeText={setName}
            autoComplete="name"
            importantForAutofill="yes"
            onSubmitEditing={() => passwordRef.current?.focus()}
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
            {loading ? <ActivityIndicator /> : <Text>회원가입</Text>}
          </Pressable>
        </View>
      </View>
    </DismissKeyBoardView>
  );
};

export default SignUpPage;

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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { useInput } from '../feature/ui/hooks';
import { TextField } from '../feature/ui/text-field';

const SignInPage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignIn'>) => {
  const [id, setId] = useInput('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const isValidEamil = id && id.trim() !== '';
  const isValidPassword = password && password.trim() !== '';

  const isValid = isValidEamil && isValidPassword;

  const onSubmit = () => {
    Alert.alert('로그인', '로그인성공');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.form}>
      <View>
        <TextField
          ref={emailRef}
          placeholder="아이디를 입력하세요"
          label="아이디"
          value={id}
          onChangeText={setId}
          importantForAutofill="yes"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          keyboardType="email-address"
        />
        <TextField
          label="비밀번호"
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
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  buttonContainer: {
    alignItems: 'center',
  },
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

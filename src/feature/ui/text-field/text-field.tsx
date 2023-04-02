import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type TextFieldProps = TextInputProps & {
  label: string;
  labelStyle?: ReturnType<typeof StyleSheet.create>;
  error?: boolean;
  errorMessage?: string;
  errorStyle?: ReturnType<typeof StyleSheet.create>;
};

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      labelStyle,
      error = false,
      errorMessage = '에러가 발생했습니다',
      errorStyle,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <View>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <TextInput ref={ref} style={[styles.input, style]} {...props} />
        <Text style={[styles.error, errorStyle]}>{error && errorMessage}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  error: {
    fontSize: 12,
    color: 'crimson',
    height: 12,
  },
});

import { useState } from 'react';

export const useInput: (value: string) => [string, (text: string) => void] = (
  initialValue?: string,
) => {
  const [value, setValue] = useState<string>(initialValue ?? '');
  const onChangeText = (text: string) => {
    setValue(text);
  };

  return [value, onChangeText];
};

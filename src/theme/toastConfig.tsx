// toastConfig.ts
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#32a852', backgroundColor: '#e6fbe7' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1c6637',
      }}
      text2Style={{
        fontSize: 14,
        color: '#1c6637',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#cc0000', backgroundColor: '#fdecea' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8b0000',
      }}
      text2Style={{
        fontSize: 14,
        color: '#8b0000',
      }}
    />
  ),
};

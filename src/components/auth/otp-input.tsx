import React, { useState, useRef, useCallback } from 'react';
import { View, TextInput, Text } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface OTPInputProps {
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = (props: OTPInputProps) => {
  const { onComplete } = props;
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<TextInput[]>([]);
  
  const handleChange = useCallback((text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    
    if (newOtp.every((digit: string) => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  }, [otp, onComplete]);
  
  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }, [otp]);
  
  return (
    <View>
      <Text style={[typography.body, { color: colors.text.secondary, textAlign: 'center', marginBottom: spacing.lg }]}>
        Enter the OTP sent to your phone
      </Text>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {otp.map((digit: string, index: number) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => {
              if (ref) inputs.current[index] = ref;
            }}
            style={{
              width: 48,
              height: 56,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              textAlign: 'center',
              ...typography.h3,
              marginHorizontal: spacing.xs,
            }}
            value={digit}
            onChangeText={(text: string) => handleChange(text, index)}
            onKeyPress={(e: any) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>
    </View>
  );
};

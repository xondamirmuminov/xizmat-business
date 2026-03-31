import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import {
  View,
  TextInput,
  TextInputProps,
  TextInputKeyPressEvent,
} from "react-native";

type OTPInputProps = {
  value?: string;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  onComplete?: VoidFunction;
  inputProps?: TextInputProps;
  onChange?: (value: string) => void;
};

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length = 5,
  onComplete,
  inputProps,
  autoFocus = true,
  disabled = false,
}) => {
  const { theme } = useUnistyles();
  const inputRefs = useRef<TextInput[]>([]);
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>();

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const value = text?.replace(/\D/g, "");
    const newOtp = [...otp];

    const isBackspace = !value && otp[index];

    if (isBackspace) {
      newOtp[index] = "";
      setOtp(newOtp);
      onChange?.(newOtp?.join(""));

      if (index > 0) {
        focusInput(index - 1);
      }

      return;
    }

    if (value.length === 1 && otp[index] !== value) {
      newOtp[index] = value;
      setOtp(newOtp);
      onChange?.(newOtp?.join(""));

      if (index < otp.length - 1) {
        focusInput(index + 1);
      } else {
        onComplete?.();
        inputRefs.current[index].blur();
      }
    }
  };

  const handleKeyPress = (event: TextInputKeyPressEvent, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  useEffect(() => {
    if (value) {
      const valueArr = value.split("").slice(0, otp.length);

      if (valueArr.join("") !== otp.join("")) {
        setOtp(valueArr);
      }
    } else if (!value) {
      setOtp(Array(length).fill(""));
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      {otp.map((code, index) => {
        const focused = focusedIndex === index;

        return (
          <View
            key={`otp-input-${index}`}
            style={[
              styles.inputContainer,
              code ? styles.filledInputContainer : {},
              focused ? styles.focusedInputContainer : {},
            ]}
          >
            <TextInput
              value={code}
              maxLength={1}
              selectTextOnFocus
              textAlign="center"
              enterKeyHint="next"
              editable={!disabled}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              placeholderTextColor={theme.colors.textSecondary}
              {...inputProps}
              style={styles.input}
              onKeyPress={(event) => handleKeyPress(event, index)}
              onFocus={() => {
                setFocusedIndex(index);
              }}
              onChangeText={(text) => {
                handleChange(text, index);
              }}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create(({ space, colors }) => ({
  filledInputContainer: {
    borderColor: colors.primary8,
  },
  focusedInputContainer: {
    borderColor: colors.primary8,
  },
  input: {
    padding: 0,
    fontSize: 30,
    width: "100%",
    height: "100%",
    color: colors.textPrimary,
    fontFamily: "Inter Medium",
  },
  inputContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderRadius: 8,
    boxSizing: "border-box",
    borderColor: colors.slate6,
  },
  container: {
    width: "100%",
    gap: space(1),
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

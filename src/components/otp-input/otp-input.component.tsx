import { isEmpty } from "lodash";
import { StyleSheet } from "react-native-unistyles";
import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Pressable, TextInputProps } from "react-native";

import { Flex } from "../flex";
import { Typography } from "../typography";

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
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  const handleChangeInput = (value: string) => {
    setCode(value);
    onChange?.(value);

    if (value?.length === length) {
      onComplete?.();
    }
  };

  const renderInputBox = (_: any, index: number) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === length - 1;
    const isCodeComplete = code.length === length;
    const isFilled = !isEmpty(digit);

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <Flex
        key={index}
        alignItems="center"
        justifyContent="center"
        style={[
          styles.inputBox,
          isInputBoxFocused && isFilled && styles.filledInputBox,
          isInputBoxFocused && isValueFocused && styles.focusedInputBox,
        ]}
      >
        <Typography weight="medium" size="display-sm">
          {digit}
        </Typography>
      </Flex>
    );
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (value && value !== code) {
      setCode(value);
    }
  }, [value]);

  const inputBoxesArray = new Array(length).fill(0);

  return (
    <View>
      <Pressable
        disabled={disabled}
        onPress={handleOnPress}
        style={styles.container}
      >
        {inputBoxesArray.map(renderInputBox)}
      </Pressable>
      <TextInput
        {...inputProps}
        value={code}
        ref={inputRef}
        maxLength={length}
        editable={!disabled}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
        style={styles.hiddenInput}
        autoComplete="one-time-code"
        onChangeText={handleChangeInput}
      />
    </View>
  );
};

const styles = StyleSheet.create(({ space, colors }) => ({
  filledInputBox: {
    borderColor: colors.primary6,
  },
  hiddenInput: { opacity: 0, zIndex: -99999, position: "absolute" },
  focusedInputBox: {
    borderColor: colors.primary8,
    backgroundColor: colors.primary2,
  },
  input: {
    padding: 0,
    fontSize: 30,
    width: "100%",
    height: "100%",
    color: colors.textPrimary,
    fontFamily: "Inter Medium",
  },
  inputBox: {
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

import { isNil } from "lodash";
import { View, Text, TextInput, Pressable } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import React, { useRef, useState, cloneElement, isValidElement } from "react";

import { renderIcon } from "@/lib/helpers";

import { ButtonProps } from "../button";
import { InputPropsType } from "./types";

export function Input({
  icon,
  label,
  style,
  prefix,
  suffix,
  onPress,
  onChange,
  helperText,
  size = "md",
  error = false,
  containerStyle,
  select = false,
  editable = true,
  required = false,
  disabled = false,
  actionIconButton,
  ...props
}: InputPropsType) {
  const { theme } = useUnistyles();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  styles.useVariants({ size, error, disabled });

  const handleInputFocus = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const renderActionIconButton = (props: ButtonProps) => {
    return isValidElement(actionIconButton)
      ? cloneElement(actionIconButton, props)
      : null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}
      <Pressable
        disabled={disabled}
        accessibilityRole="button"
        onPress={() => {
          handleInputFocus();
          onPress?.();
        }}
        style={[
          styles.inputContainer(focused, !isNil(actionIconButton)),
          style,
        ]}
      >
        {renderIcon({ icon, style: styles.icon })}
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          {...props}
          ref={inputRef}
          onPress={onPress}
          aria-label={label}
          style={styles.input}
          onChangeText={onChange}
          editable={editable && !disabled && !select}
          onBlur={(e) => {
            props?.onBlur?.(e);
            setFocused(false);
          }}
          onFocus={(e) => {
            props?.onFocus?.(e);
            setFocused(true);
          }}
          placeholderTextColor={
            props.placeholderTextColor ?? theme.colors.slate8
          }
        />
        {suffix && <Text style={styles.prefix}>{suffix}</Text>}
        {renderActionIconButton({
          disabled,
          size: "sm",
          radius: "circular",
          style: styles.actionIconButton,
          iconStyle: styles.actionIconButtonIcon,
        })}
      </Pressable>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  label: {
    fontSize: 14,
    fontFamily: "Inter Medium",
    color: theme.colors.slate12,
  },
  asterisk: {
    fontSize: 14,
    color: theme.colors.red11,
    fontFamily: "Inter Medium",
  },
  container: {
    gap: 8,
    width: "100%",
    flexShrink: 1,
    display: "flex",
    maxWidth: "100%",
    flexDirection: "column",
  },
  actionIconButtonIcon: {
    variants: {
      size: {
        lg: {},
        sm: { width: 16, height: 16 },
        md: { width: 20, height: 20 },
      },
    },
  },
  helperText: {
    fontSize: 12,
    color: theme.colors.slate9,
    variants: {
      error: {
        true: { color: theme.colors.red10 },
        false: { color: theme.colors.slate9 },
      },
    },
  },
  actionIconButton: {
    padding: 0,
    variants: {
      size: {
        lg: {},
        sm: { width: 26, height: 26, minWidth: 26 },
        md: { width: 32, height: 32, minWidth: 32 },
      },
    },
  },
  icon: {
    color: theme.colors.slate11,
    variants: {
      disabled: {
        true: { color: theme.colors.slate7 },
        false: { color: theme.colors.slate11 },
      },
      size: {
        sm: { width: 18, height: 18 },
        md: { width: 20, height: 20 },
        lg: { width: 22, height: 22 },
      },
    },
  },
  prefix: {
    fontFamily: "Inter",
    color: theme.colors.slate11,
    variants: {
      size: {
        sm: { fontSize: 14 },
        md: { fontSize: 14 },
        lg: { fontSize: 16 },
      },
      disabled: {
        true: { color: theme.colors.slate7 },
        false: { color: theme.colors.slate11 },
      },
    },
  },
  input: {
    flex: 1,
    padding: 0,
    height: "100%",
    outline: "none",
    maxWidth: "100%",
    fontFamily: "Inter",
    color: theme.colors.textPrimary,
    variants: {
      size: {
        sm: { fontSize: 14 },
        md: { fontSize: 14 },
        lg: { fontSize: 16 },
      },
      disabled: {
        true: { color: theme.colors.slate7 },
        false: { color: theme.colors.textPrimary },
      },
    },
  },
  inputContainer: (focused: boolean, hasActionIconButton: boolean) => ({
    gap: 8,
    width: "100%",
    borderWidth: 1,
    display: "flex",
    borderRadius: 6,
    maxWidth: "100%",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
    borderColor: focused ? theme.colors.primary7 : theme.colors.slate6,
    compoundVariants: [
      {
        disabled: true,
        styles: {
          borderColor: theme.colors.slate3,
          backgroundColor: theme.colors.slate2,
        },
      },
    ],
    variants: {
      error: {
        true: {
          borderColor: theme.colors.red9,
        },
      },
      size: {
        sm: {
          height: 36,
          paddingBlock: 4,
          paddingLeft: 10,
          paddingRight: hasActionIconButton ? 4 : 10,
        },
        md: {
          height: 40,
          paddingBlock: 6,
          paddingLeft: 12,
          paddingRight: hasActionIconButton ? 6 : 12,
        },
        lg: {
          height: 44,
          paddingBlock: 8,
          paddingLeft: 14,
          paddingRight: hasActionIconButton ? 6 : 14,
        },
      },
    },
  }),
}));

import { isBoolean } from "lodash";
import { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { CheckIcon } from "@/assets";

import { Flex } from "../flex";
import { CheckboxPropsType } from "./types";
import { Typography, TypographySizeEnum } from "../typography";

export function Checkbox({
  label,
  value,
  onChange,
  size = "md",
  isChecked: initialIsChecked,
}: CheckboxPropsType) {
  const [isChecked, setIsChecked] = useState(initialIsChecked || false);

  styles.useVariants({ size, checked: isChecked });

  const toggleChecked = () => {
    setIsChecked((prev) => !prev);

    if (isChecked) {
      onChange?.(undefined);
      return;
    }

    onChange?.(value);
  };

  const labelSize = ("text-" + size) as TypographySizeEnum;

  useEffect(() => {
    if (initialIsChecked !== isChecked && isBoolean(initialIsChecked)) {
      setIsChecked(initialIsChecked || false);
    }
  }, [initialIsChecked]);

  return (
    <View style={styles.container}>
      <Flex gap={1} direction="row" alignItems="center">
        <Pressable onPress={toggleChecked} style={styles.iconWrapper}>
          {isChecked ? <CheckIcon style={styles.icon} /> : null}
        </Pressable>
        <Pressable onPress={toggleChecked}>
          <Typography weight="medium" size={labelSize}>
            {label}
          </Typography>
        </Pressable>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  container: {},
  icon: {
    width: 12,
    height: 12,
    color: colors.primary,
    variants: {
      size: {
        sm: { width: 12, height: 12 },
        md: { width: 14, height: 14 },
        lg: { width: 16, height: 16 },
      },
    },
  },
  iconWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    variants: {
      checked: {
        false: { borderColor: colors.slate6 },
        true: {
          borderColor: colors.primary8,
          backgroundColor: colors.primary2,
        },
      },
      size: {
        sm: {
          width: 16,
          height: 16,
        },
        md: {
          width: 20,
          height: 20,
        },
        lg: {
          width: 24,
          height: 24,
        },
      },
    },
  },
}));

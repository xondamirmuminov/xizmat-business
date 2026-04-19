import { Dayjs } from "dayjs";
import { StyleSheet } from "react-native-unistyles";
import { StyleProp, TouchableOpacity } from "react-native";

import { Flex, Typography } from "@/components";

type Props = {
  time: Dayjs;
  disabled?: boolean;
  selected?: boolean;
  style?: StyleProp<any>;
  onPress?: (time: Dayjs) => void;
};

export function ServiceDateTimePickerTimeItem({
  time,
  style,
  onPress,
  disabled,
  selected,
}: Props) {
  styles.useVariants({ disabled, selected });

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.timeItem, style]}
      onPress={() => {
        if (!disabled) {
          onPress?.(time);
        }
      }}
    >
      <Flex alignItems="center">
        <Typography
          size="text-md"
          align="center"
          weight="semibold"
          style={styles.timeText}
        >
          {time.format("HH:mm")}
        </Typography>
      </Flex>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  timeText: {
    color: colors.textPrimary,
    compoundVariants: [
      {
        disabled: true,
        selected: true,
        styles: {
          color: colors.slate7,
        },
      },
    ],
    variants: {
      selected: {
        true: {
          color: colors.white,
        },
      },
      disabled: {
        true: {
          color: colors.slate7,
        },
      },
    },
  },
  timeItem: {
    borderWidth: 1,
    borderRadius: 8,
    paddingBlock: space(1),
    paddingInline: space(1),
    borderColor: colors.slate6,
    backgroundColor: colors.background,
    compoundVariants: [
      {
        disabled: true,
        selected: true,
        styles: {
          borderColor: colors.slate3,
          backgroundColor: colors.slate2,
        },
      },
    ],
    variants: {
      disabled: {
        true: {
          borderColor: colors.slate3,
          backgroundColor: colors.slate2,
        },
      },
      selected: {
        true: {
          borderColor: colors.primary,
          backgroundColor: colors.primary,
        },
      },
    },
  },
}));

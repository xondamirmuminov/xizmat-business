import { Dayjs } from "dayjs";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Typography } from "@/components";

type Props = {
  date: Dayjs;
  disabled?: boolean;
  selected?: boolean;
  onPress?: (date: Dayjs) => void;
};

export function ServiceDateTimePickerDateItem({
  date,
  onPress,
  selected,
  disabled = false,
}: Props) {
  styles.useVariants({ disabled, selected });

  return (
    <Pressable
      disabled={disabled}
      style={styles.dateItem}
      onPress={() => {
        if (!disabled) {
          onPress?.(date);
        }
      }}
    >
      <Flex alignItems="center">
        <Typography
          size="text-xs"
          align="center"
          weight="medium"
          color="secondary"
          style={styles.dayText}
        >
          {date.format("ddd")}
        </Typography>
        <Typography
          align="center"
          size="display-xs"
          weight="semibold"
          style={styles.dateText}
        >
          {date.format("DD")}
        </Typography>
      </Flex>
    </Pressable>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  dayText: {
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
  dateText: {
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
  dateItem: {
    minWidth: 72,
    borderWidth: 1,
    borderRadius: 10,
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

import { useMemo, RefObject } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { CheckIcon } from "@/assets";
import { Typography } from "@/components/typography";
import { CustomBottomSheetModal } from "@/components/custom-bottom-sheet-modal";

import { SelectOptionType } from "../../types";

type Props = {
  title: string;
  value?: string;
  options: SelectOptionType[];
  getLabel?: (label: string) => string;
  ref: RefObject<null | BottomSheetModal>;
  onSelect?: (option: SelectOptionType) => void;
};

export function SelectModal({
  ref,
  value,
  options,
  getLabel,
  onSelect,
  title = "Select",
}: Props) {
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handleClose = () => {
    ref?.current?.close();
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      title={title}
      snapPoints={snapPoints}
      contentStyle={styles.content}
    >
      {options?.map((option) => {
        const isSelected = option?.value === value;

        return (
          <TouchableOpacity
            key={option?.value}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => {
              onSelect?.(option);
              handleClose();
            }}
          >
            <Typography size="text-md" weight="medium">
              {getLabel ? getLabel(option?.label) : option?.label}
            </Typography>
            {isSelected && <CheckIcon style={styles.selectedOptionIcon} />}
          </TouchableOpacity>
        );
      })}
    </CustomBottomSheetModal>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  selectedOption: { backgroundColor: colors.primary2 },
  content: {
    gap: 6,
    paddingInline: space(1.5),
  },
  selectedOptionIcon: {
    width: 20,
    height: 20,
    color: colors.primary10,
  },
  option: {
    gap: space(1),
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingBlock: space(1.5),
    paddingInline: space(1.5),
    justifyContent: "space-between",
  },
}));

import { View } from "react-native";
import { useMemo, useCallback } from "react";
import { StyleSheet } from "react-native-unistyles";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { XIcon } from "@/assets";

import { Button } from "../button";
import { Divider } from "../divider";
import { Typography } from "../typography";
import { CustomBottomSheetModalPropsType } from "./types";

export function CustomBottomSheetModal({
  ref,
  title,
  children,
  contentStyle,
  ...props
}: CustomBottomSheetModalPropsType) {
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const handleCloseModal = useCallback(() => {
    ref?.current?.close();
  }, [ref]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      snapPoints={props?.snapPoints || snapPoints}
      handleIndicatorStyle={styles.sheetHandlerIndicator}
      {...props}
    >
      <BottomSheetScrollView style={styles.container}>
        {title && (
          <View style={styles.header}>
            <Typography size="text-xl" weight="medium" style={styles.title}>
              {title}
            </Typography>
            <Button
              size="sm"
              variant="text"
              color="secondary"
              radius="circular"
              startIcon={<XIcon />}
              onPress={handleCloseModal}
              iconStyle={styles.closeButtonIconStyle}
            />
          </View>
        )}
        {title && <Divider space={0} />}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  title: { flexShrink: 1 },
  container: {
    flex: 1,
  },
  closeButtonIconStyle: { color: colors.slate11 },
  sheetBackground: {
    backgroundColor: colors.background,
  },
  sheetHandlerIndicator: {
    backgroundColor: colors.textSecondary,
  },
  content: {
    paddingBlock: space(2),
    paddingBottom: space(3),
    paddingInline: space(2),
  },
  header: {
    gap: space(2),
    alignItems: "center",
    flexDirection: "row",
    paddingTop: space(2),
    paddingRight: space(1),
    paddingBottom: space(2),
    paddingInline: space(2),
    justifyContent: "space-between",
  },
}));

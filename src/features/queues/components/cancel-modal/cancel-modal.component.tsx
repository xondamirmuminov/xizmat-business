import { useState, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { View, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { renderIcon } from "@/lib/helpers";
import { CANCEL_BOOKING_REASONS } from "@/lib/constants";
import { BookingType, BookingStatusEnum } from "@/types";
import {
  Flex,
  Input,
  Button,
  Typography,
  CustomBottomSheetModal,
} from "@/components";

import {
  BOOKING_CARD_FRAGMENT,
  UPDATE_BOOKING_STATUS_MUTATION,
} from "../../api";

type Props = {
  bookingId: string;
  ref: RefObject<null | BottomSheetModal>;
};

export function BookingCancelModal({ ref, bookingId }: Props) {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const { t } = useTranslation();
  const { theme } = useUnistyles();

  const [updateBookingStatus, { loading }] = useMutation<{
    updateBookingStatus: BookingType;
  }>(UPDATE_BOOKING_STATUS_MUTATION);

  const handleCompleted = () => {
    ref?.current?.dismiss();
    setSelectedReason("");
  };

  const handleCancel = () => {
    if (bookingId) {
      updateBookingStatus({
        onCompleted: handleCompleted,
        variables: {
          id: bookingId,
          status: BookingStatusEnum.DECLINED,
          reason: selectedReason || undefined,
        },
        update(cache, { data }) {
          if (data?.updateBookingStatus) {
            cache.writeFragment({
              fragment: BOOKING_CARD_FRAGMENT,
              id: cache.identify(data?.updateBookingStatus),
              data: {
                ...data?.updateBookingStatus,
              },
            });
          }
        },
      });
    }
  };

  return (
    <CustomBottomSheetModal ref={ref}>
      <Flex gap={4}>
        <Flex gap={3}>
          <Typography size="text-xl" weight="semibold">
            {t("bookings.cancel.why")}
          </Typography>
          <Flex gap={1.5} flexWrap="wrap" direction="row">
            {CANCEL_BOOKING_REASONS?.map((reason) => {
              const isSelected = t(reason?.title) === selectedReason;

              return (
                <TouchableOpacity
                  key={reason?.title}
                  style={styles.reasonItem}
                  onPress={() => {
                    setSelectedReason(t(reason?.title));
                  }}
                >
                  <Flex
                    gap={1.5}
                    direction="row"
                    alignItems="center"
                    style={[
                      styles.reasonContent,
                      isSelected && styles.selectedReasonContent,
                    ]}
                  >
                    {renderIcon({
                      icon: reason?.icon,
                      style: [
                        styles.reasonIcon,
                        isSelected && styles.selectedReasonText,
                      ],
                    })}
                    <Typography
                      size="text-sm"
                      style={isSelected && styles.selectedReasonText}
                    >
                      {t(reason?.title)}
                    </Typography>
                  </Flex>
                </TouchableOpacity>
              );
            })}
            <View style={styles.reasonItem}>
              <Flex
                gap={1.5}
                direction="row"
                alignItems="center"
                style={[styles.reasonContent, styles.reasonInputContent]}
              >
                <Input
                  size="lg"
                  placeholderTextColor={theme.colors.slate11}
                  style={{ borderColor: theme.colors.slate3 }}
                  onChange={(value) => setSelectedReason(value)}
                  placeholder={t("bookings.cancel.comment_placeholder")}
                />
              </Flex>
            </View>
          </Flex>
        </Flex>
        <Button
          size="xl"
          fullWidth
          color="error"
          loading={loading}
          onPress={handleCancel}
        >
          {t("actions.decline")}
        </Button>
      </Flex>
    </CustomBottomSheetModal>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  reasonItem: {
    flex: 1,
    minWidth: 120,
  },
  selectedReasonText: {
    color: colors.white,
  },
  selectedReasonContent: {
    backgroundColor: colors.black,
  },
  reasonIcon: {
    width: 20,
    height: 20,
    color: colors.textPrimary,
  },
  reasonInputContent: {
    paddingBlock: space(0.5),
    paddingInline: space(0.5),
  },
  reasonContent: {
    borderRadius: 8,
    maxWidth: "100%",
    overflow: "hidden",
    paddingBlock: space(1.5),
    paddingInline: space(1.5),
    backgroundColor: colors.slate3,
  },
}));

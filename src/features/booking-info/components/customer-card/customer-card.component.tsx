import { Image } from "expo-image";
import { StyleSheet } from "react-native-unistyles";

import { AvatarPlaceholder } from "@/assets";
import { Flex, Typography } from "@/components";
import { formatPhoneNumberForDisplay } from "@/lib/helpers";

type Props = {
  phone?: string;
  avatar?: string;
  fullName?: string;
};

export function BookingInfoCustomerCard({ phone, avatar, fullName }: Props) {
  return (
    <Flex gap={1.5} direction="row" alignItems="center">
      <Image
        contentFit="cover"
        source={{ uri: avatar }}
        style={styles.userAvatar}
        placeholderContentFit="cover"
        placeholder={AvatarPlaceholder}
      />
      <Flex gap={0.5}>
        <Typography weight="medium">{fullName}</Typography>
        <Typography color="secondary">
          {formatPhoneNumberForDisplay(phone || "")}
        </Typography>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(() => ({
  userAvatar: { width: 56, height: 56, borderRadius: 28 },
}));

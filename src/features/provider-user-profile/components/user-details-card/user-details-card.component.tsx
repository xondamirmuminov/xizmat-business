import { Image } from "expo-image";
import { StyleSheet } from "react-native-unistyles";

import { UserType } from "@/types";
import { AvatarPlaceholder } from "@/assets";
import { Flex, Typography } from "@/components";
import { formatPhoneNumberForDisplay } from "@/lib/helpers";

type Props = {
  user: UserType;
};

export function ProviderProfileUserDetailsCard({ user }: Props) {
  return (
    <Flex gap={2} direction="row" alignItems="center" style={styles.section}>
      <Image
        contentFit="cover"
        style={styles.avatar}
        placeholderContentFit="cover"
        source={{ uri: user?.avatar }}
        placeholder={AvatarPlaceholder}
      />
      <Flex gap={0.5}>
        <Typography size="text-lg" weight="semibold">
          {user?.fullName}
        </Typography>
        <Typography size="text-sm" weight="medium" color="secondary">
          {formatPhoneNumberForDisplay(user?.phone || "")}
        </Typography>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 72,
  },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    paddingInline: space(2),
    paddingBlock: space(1.5),
    borderColor: colors.slate4,
    backgroundColor: colors.slate2,
  },
}));

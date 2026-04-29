import type { RefObject } from "react";

import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useAuthStore } from "@/store";
import { deleteToken } from "@/lib/helpers";
import { Flex, Button, Typography, CustomBottomSheetModal } from "@/components";

type Props = {
  ref: RefObject<null | BottomSheetModal>;
};

export function ConfirmSignOutModal({ ref }: Props) {
  const { signOut } = useAuthStore();

  const { t } = useTranslation();

  const handleSignOut = async () => {
    signOut();
    await deleteToken();
    handleCancel();
  };

  const handleCancel = () => {
    ref.current?.close();
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={[260]}
      title={t("user_profile.sign_out.title")}
    >
      <Flex gap={3}>
        <Flex gap={1}>
          <Typography size="text-md" color="secondary">
            {t("user_profile.sign_out.description")}
          </Typography>
        </Flex>
        <Flex gap={1} direction="row">
          <Button
            size="lg"
            fullWidth
            color="secondary"
            variant="outlined"
            onPress={handleCancel}
          >
            {t("actions.cancel")}
          </Button>
          <Button size="lg" fullWidth color="error" onPress={handleSignOut}>
            {t("actions.sign_out")}
          </Button>
        </Flex>
      </Flex>
    </CustomBottomSheetModal>
  );
}

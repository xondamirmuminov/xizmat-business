import { View } from "react-native";

import { Button } from "@/components";
import { useAuthStore } from "@/store";
import { deleteToken } from "@/lib/helpers";

function ProfileScreen() {
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    signOut();
    await deleteToken();
  };

  return (
    <View>
      <Button color="error" onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
}

export default ProfileScreen;

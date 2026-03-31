import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";

export function Loader() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color="#00aba9" />
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  wrapper: {
    top: 0,
    zIndex: 99,
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
}));

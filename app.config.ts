import type { ConfigContext } from "expo/config";

export default ({ config }: ConfigContext) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey: process.env.EXPO_GOOGLE_MAPS_API_KEY ?? "",
        iosGoogleMapsApiKey: process.env.EXPO_GOOGLE_MAPS_API_KEY ?? "",
      },
    ],
  ],
});

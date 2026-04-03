import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { Controller, useFormContext } from "react-hook-form";
import { Camera, MapView, MarkerView } from "@maplibre/maplibre-react-native";

import { MapPinFilledIcon } from "@/assets";
import { getErrorMessage } from "@/lib/helpers";
import { Flex, Input, Typography } from "@/components";

const INITIAL_COORDS = [67.823309, 40.133476];
const MAP_TILER_STYLE_URL =
  "https://api.maptiler.com/maps/openstreetmap/style.json";

export function BusinessAddressFormStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  const handleGetErrorMessage = getErrorMessage(errors, t);

  return (
    <Flex gap={3}>
      <Controller
        name="address"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Address"
            error={!!error}
            placeholder="e.g. Zargarlik ko'chasi 1-uy, S2, Jizzax"
            helperText={
              error
                ? handleGetErrorMessage(field?.name)
                : "Address will be filled automatically after you set your location on the map below."
            }
          />
        )}
      />
      <Controller
        name="coords"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Flex gap={1}>
            <Typography size="text-sm" weight="medium">
              Select business location on the map
            </Typography>
            <MapView
              style={styles.map}
              mapStyle={`${MAP_TILER_STYLE_URL}?key=${process.env.EXPO_PUBLIC_MAPTILER_API_KEY}`}
              onPress={(feature) => {
                const coords = (feature?.geometry as GeoJSON.Point)
                  ?.coordinates;
                field?.onChange({ latitude: coords[0], longitude: coords[1] });
              }}
            >
              <Camera
                zoomLevel={15}
                animationMode="flyTo"
                centerCoordinate={INITIAL_COORDS}
              />
              {!isEmpty(field?.value) && (
                <MarkerView
                  coordinate={[field?.value?.latitude, field?.value?.longitude]}
                >
                  <MapPinFilledIcon style={styles.mapPinIcon} />
                </MarkerView>
              )}
            </MapView>
            {!!error && (
              <Typography color="error" size="text-xs">
                {handleGetErrorMessage(field?.name)}
              </Typography>
            )}
          </Flex>
        )}
      />
    </Flex>
  );
}

const styles = StyleSheet.create(() => ({
  mapPinIcon: { width: 20, height: 20, color: "red" },
  map: { height: 340, width: "100%", borderRadius: 12, overflow: "hidden" },
}));

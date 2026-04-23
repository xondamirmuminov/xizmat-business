import { isEmpty } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Controller, useFormContext } from "react-hook-form";
import { Camera, MapView, MarkerView } from "@maplibre/maplibre-react-native";

import { MapPinFilledIcon } from "@/assets";
import { Flex, Input, Typography } from "@/components";
import { LocalizedTextType, BusinessFormValuesType } from "@/types";
import { getErrorMessage, getAddressFromCoords } from "@/lib/helpers";

const INITIAL_COORDS = [67.823309, 40.133476];
const MAP_TILER_STYLE_URL =
  "https://api.maptiler.com/maps/openstreetmap/style.json";

export function BusinessAddressFormStep() {
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const { control, setValue, clearErrors } =
    useFormContext<BusinessFormValuesType>();

  const { t, i18n } = useTranslation();
  const locale = i18n.language as keyof LocalizedTextType;

  const handleAutoCompleteAddress = async (lat: number, lon: number) => {
    setIsAddressLoading(true);
    const formattedAddress = await getAddressFromCoords(lat, lon, locale, [
      "country",
      "postcode",
      "country_code",
      "continent",
    ]);
    setIsAddressLoading(false);

    setValue("address", formattedAddress);
    clearErrors("address");
  };

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <Flex gap={3}>
      <Controller
        name="address"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            required
            error={!!error}
            label={t("labels.address")}
            editable={!isAddressLoading}
            placeholder="e.g. Zargarlik ko'chasi 1-uy, S2, Jizzax"
            actionIconButton={
              isAddressLoading ? <ActivityIndicator /> : undefined
            }
            helperText={
              error
                ? handleGetErrorMessage(error)
                : t("create_business.steps.address.autocomplete_helper_text")
            }
          />
        )}
      />
      {/* <Controller
        name="coords"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <Flex gap={1}>
            <Typography size="text-sm" weight="medium">
              {t("create_business.steps.address.coords_title")}{" "}
              <Typography color="error" size="text-sm" weight="medium">
                *
              </Typography>
            </Typography>
            <MapView
              style={styles.map}
              mapStyle={`${MAP_TILER_STYLE_URL}?key=${process.env.EXPO_PUBLIC_MAPTILER_API_KEY}`}
              onPress={(feature) => {
                const coords = (feature?.geometry as GeoJSON.Point)
                  ?.coordinates;
                field?.onChange({ latitude: coords[1], longitude: coords[0] });
                handleAutoCompleteAddress(coords[1], coords[0]);
              }}
            >
              <Camera
                zoomLevel={15}
                animationMode="flyTo"
                centerCoordinate={INITIAL_COORDS}
              />
              {!isEmpty(field?.value) && (
                <MarkerView
                  coordinate={[field?.value?.longitude, field?.value?.latitude]}
                >
                  <MapPinFilledIcon style={styles.mapPinIcon} />
                </MarkerView>
              )}
            </MapView>
            {!!error && (
              <Typography color="error" size="text-xs">
                {handleGetErrorMessage(error)}
              </Typography>
            )}
          </Flex>
        )}
      /> */}
    </Flex>
  );
}

const styles = StyleSheet.create(() => ({
  mapPinIcon: { width: 20, height: 20, color: "red" },
  map: { height: 340, width: "100%", borderRadius: 12, overflow: "hidden" },
}));

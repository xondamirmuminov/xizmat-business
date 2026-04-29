import { useState } from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { Platform, ActivityIndicator } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { Flex, Input, Typography } from "@/components";
import { LocalizedTextType, BusinessFormValuesType } from "@/types";
import { getErrorMessage, getAddressFromCoords } from "@/lib/helpers";

const INITIAL_LATITUDE = 40.133476;
const INITIAL_LONGITUDE = 67.823309;
const INITIAL_REGION = {
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
  latitude: INITIAL_LATITUDE,
  longitude: INITIAL_LONGITUDE,
};

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
      <Controller
        name="coords"
        control={control}
        rules={Platform.OS === "web" ? {} : { required: true }}
        render={({ field, fieldState: { error } }) =>
          Platform.OS === "web" ? (
            <Typography size="text-xs" color="secondary">
              {t("create_business.steps.address.map_web_hint")}
            </Typography>
          ) : (
            <Flex gap={1}>
              <Typography size="text-sm" weight="medium">
                {t("create_business.steps.address.coords_title")}{" "}
                <Typography color="error" size="text-sm" weight="medium">
                  *
                </Typography>
              </Typography>
              <MapView
                poiClickEnabled
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                onPress={(e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  field.onChange({ latitude, longitude });
                  handleAutoCompleteAddress(latitude, longitude);
                }}
                onPoiClick={(e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  field.onChange({ latitude, longitude });
                  handleAutoCompleteAddress(latitude, longitude);
                }}
              >
                {!isEmpty(field.value) && (
                  <Marker
                    coordinate={{
                      latitude: field.value!.latitude,
                      longitude: field.value!.longitude,
                    }}
                  />
                )}
              </MapView>
              {!!error && (
                <Typography color="error" size="text-xs">
                  {handleGetErrorMessage(error)}
                </Typography>
              )}
            </Flex>
          )
        }
      />
    </Flex>
  );
}

const styles = StyleSheet.create(() => ({
  map: { height: 340, width: "100%", borderRadius: 12, overflow: "hidden" },
}));

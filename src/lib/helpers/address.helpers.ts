import { LocalizedTextType } from "@/types";

import { NOMINATIM_API_URL, NOMINATIM_USER_AGENT } from "../constants";

type ExcludeOptions =
  | "city"
  | "town"
  | "state"
  | "region"
  | "county"
  | "country"
  | "village"
  | "postcode"
  | "continent"
  | "country_code"
  | "municipality"
  | "state_district";

export const getAddressFromCoords = async (
  lat: number,
  lon: number,
  locale: keyof LocalizedTextType,
  exclude: ExcludeOptions[] = [
    "city",
    "state",
    "county",
    "country",
    "postcode",
    "country_code",
  ],
): Promise<string> => {
  const response = await fetch(
    `${NOMINATIM_API_URL}/reverse?lat=${lat}&lon=${lon}&format=jsonv2`,
    {
      headers: {
        "Accept-Language": locale,
        Accept: "application/json",
        "User-Agent": NOMINATIM_USER_AGENT,
      },
    },
  );
  const data = await response.json();

  if (data?.display_name && data?.address) {
    const addressBlackList = exclude?.map((item) => data?.address[item]);

    const addressArray: string[] = data.display_name?.split(", ");

    if (addressArray?.length) {
      const formattedAddress: string = addressArray
        ?.filter((item) => !addressBlackList?.includes(item))
        .join(", ");

      return formattedAddress;
    }
  }

  return "";
};

import type { Href } from "expo-router";

import { Redirect } from "expo-router";

export default function NoBusinessRedirect() {
  return <Redirect href={"/(pre-work)/(tabs)/businesses" as Href} />;
}
import { ReactElement } from "react";

import { IconPropsType } from "@/types";
import { UserXIcon, PhoneOffIcon } from "@/assets";

export const CANCEL_BOOKING_REASONS: {
  title: string;
  icon: ReactElement<IconPropsType>;
}[] = [
  {
    icon: <UserXIcon />,
    title: "cancel_reasons.customer_asked_cancel",
  },
  {
    icon: <PhoneOffIcon />,
    title: "cancel_reasons.customer_not_responding",
  },
];

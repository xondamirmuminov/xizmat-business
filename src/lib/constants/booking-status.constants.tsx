import { ReactElement } from "react";

import { ChipColorEnum } from "@/components/chip/types";
import { IconPropsType, BookingStatusEnum } from "@/types";
import {
  ZapFilledIcon,
  ClockFilledIcon,
  CircleXFilledIcon,
  CircleCheckFilledIcon,
  ClipboardClockFilledIcon,
} from "@/assets";

export const BOOKING_STATUS: Record<
  BookingStatusEnum,
  { color: ChipColorEnum; icon: ReactElement<IconPropsType> }
> = {
  IN_PROGRESS: { color: "info", icon: <ZapFilledIcon /> },
  DECLINED: { color: "error", icon: <CircleXFilledIcon /> },
  CANCELLED: { color: "error", icon: <CircleXFilledIcon /> },
  CONFIRMED: { color: "secondary", icon: <ClockFilledIcon /> },
  COMPLETED: { color: "success", icon: <CircleCheckFilledIcon /> },
  PENDING: { color: "warning", icon: <ClipboardClockFilledIcon /> },
};

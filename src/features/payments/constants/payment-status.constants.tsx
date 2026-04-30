import { ReactElement } from "react";

import { ChipColorEnum } from "@/components/chip/types";
import { IconPropsType, PaymentStatusEnum } from "@/types";
import {
  ClipboardClockFilledIcon,
  CircleCheckFilledIcon,
  CircleXFilledIcon,
  ZapFilledIcon,
} from "@/assets";

export const PAYMENT_STATUS_CHIP: Record<
  PaymentStatusEnum,
  { color: ChipColorEnum; icon: ReactElement<IconPropsType> }
> = {
  PENDING: { color: "warning", icon: <ClipboardClockFilledIcon /> },
  PARTIALLY_PAID: { color: "info", icon: <ZapFilledIcon /> },
  PAID: { color: "success", icon: <CircleCheckFilledIcon /> },
  OVERDUE: { color: "error", icon: <CircleXFilledIcon /> },
};

import { UserType } from "./user.types";
import { ServiceType } from "./service.types";
import { BusinessType } from "./business.types";

export enum BookingStatusEnum {
  PENDING = "PENDING",
  DECLINED = "DECLINED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
}

export type BookingType = {
  _id: string;
  endAt?: Date;
  price: number;
  startAt?: Date;
  user?: UserType;
  dateKey: string;
  bookingId: string;
  isStandBy: boolean;
  guestPhone?: string;
  service: ServiceType;
  guestFullName?: string;
  business: BusinessType;
  durationMinutes: number;
  status: BookingStatusEnum;
};

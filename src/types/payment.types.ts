export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}

export type PaymentType = {
  _id: string;
  paymentCode?: string | null;
  month: string;
  amount: number;
  paidAmount: number;
  status: PaymentStatusEnum;
  remaining: number;
};

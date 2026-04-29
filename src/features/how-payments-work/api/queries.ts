import { gql } from "@apollo/client";

export const PAYMENT_PLATFORM_SETTINGS_QUERY = gql`
  query PaymentPlatformSettings {
    paymentPlatformSettings {
      bookingPlatformFeePercent
    }
  }
`;

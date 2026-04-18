import { gql } from "@apollo/client";

export const BOOKING_CREATED_SUBSCRIPTION = gql`
  subscription Subscription {
    providerBookingCreated {
      ...BookingCardFragment
    }
  }
`;

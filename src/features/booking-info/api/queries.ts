import { gql } from "@apollo/client";

export const BOOKING_QUERY = gql`
  query Booking($bookingId: ID!) {
    booking(id: $bookingId) {
      ...BookingInfoFragment
    }
  }
`;

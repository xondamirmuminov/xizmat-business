import { gql } from "@apollo/client";

export const UPDATE_BOOKING_STATUS_MUTATION = gql`
  mutation UpdateBookingStatus(
    $id: ID!
    $status: BookingStatusEnum!
    $reason: String
  ) {
    updateBookingStatus(id: $id, status: $status, reason: $reason) {
      ...BookingInfoFragment
    }
  }
`;

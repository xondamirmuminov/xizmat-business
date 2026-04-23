import { gql } from "@apollo/client";

export const UPDATE_BOOKING_STATUS_MUTATION = gql`
  mutation UpdateBookingStatus(
    $id: ID!
    $status: BookingStatusEnum!
    $reason: String
  ) {
    updateBookingStatus(id: $id, status: $status, reason: $reason) {
      ...BookingCardFragment
      ...BookingInfoFragment
    }
  }
`;

export const CREATE_BOOKING_BY_PROVIDER_MUTATION = gql`
  mutation CreateBookingByProvider($data: CreateBookingByProviderInput!) {
    createBookingByProvider(data: $data) {
      ...BookingCardFragment
    }
  }
`;

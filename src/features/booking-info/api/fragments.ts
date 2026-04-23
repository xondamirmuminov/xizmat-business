import { gql } from "@apollo/client";

export const BOOKING_INFO_FRAGMENT = gql`
  fragment BookingInfoFragment on Booking {
    _id
    bookingId
    cancelReason
    dateKey
    endAt
    guestFullName
    guestPhone
    price
    service {
      _id
      title {
        en
        uz
        ru
      }
      durationMinutes
      primaryImage
      price
    }
    startAt
    status
    user {
      _id
      avatar
      phone
      fullName
    }
  }
`;

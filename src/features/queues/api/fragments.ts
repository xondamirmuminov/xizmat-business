import { gql } from "@apollo/client";

export const BOOKING_CARD_FRAGMENT = gql`
  fragment BookingCardFragment on Booking {
    _id
    bookingId
    endAt
    price
    durationMinutes
    service {
      _id
      title {
        en
        uz
        ru
      }
    }
    startAt
    status
    guestFullName
    guestPhone
    user {
      _id
      avatar
      fullName
      phone
    }
  }
`;

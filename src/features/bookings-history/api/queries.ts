import { gql } from "@apollo/client";

export const BUSINESS_BOOKINGS_QUERY = gql`
  query BusinessBookings(
    $providerId: ID!
    $businessId: ID
    $page: Int
    $limit: Int
    $search: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    businessBookings(
      providerId: $providerId
      businessId: $businessId
      page: $page
      limit: $limit
      search: $search
      startDate: $startDate
      endDate: $endDate
    ) {
      pageInfo {
        currentPage
        perPage
        totalItems
        totalPages
        hasNextPage
        hasPreviousPage
      }
      items {
        _id
        bookingId
        dateKey
        startAt
        status
        endAt
        guestFullName
        guestPhone
        price
        user {
          _id
          fullName
          phone
          avatar
        }
      }
    }
  }
`;

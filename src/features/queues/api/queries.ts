import { gql } from "@apollo/client";

export const BUSINESS_BOOKINGS_QUERY = gql`
  query BusinessBookings(
    $providerId: ID!
    $status: [BookingStatusEnum!]
    $businessId: ID
    $page: Int
    $limit: Int
    $startDate: DateTime
    $endDate: DateTime
  ) {
    businessBookings(
      providerId: $providerId
      status: $status
      businessId: $businessId
      page: $page
      limit: $limit
      startDate: $startDate
      endDate: $endDate
    ) {
      items {
        ...BookingCardFragment
      }
      pageInfo {
        currentPage
        perPage
        totalItems
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

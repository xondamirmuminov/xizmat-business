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

export const SERVICES_QUERY = gql`
  query Services($businessId: ID, $page: Int, $limit: Int) {
    services(businessId: $businessId, page: $page, limit: $limit) {
      items {
        _id
        title {
          en
          uz
          ru
        }
      }
    }
  }
`;

export const GET_AVAILABLE_TIME_SLOTS_QUERY = gql`
  query GetAvailableTimeSlots($businessId: ID!, $serviceId: ID, $date: String) {
    getAvailableTimeSlots(
      businessId: $businessId
      serviceId: $serviceId
      date: $date
    ) {
      endAt
      startAt
    }
  }
`;

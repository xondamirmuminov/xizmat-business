import { gql } from "@apollo/client";

export const SERVICES_QUERY = gql`
  query Services($page: Int, $limit: Int, $businessId: ID) {
    services(page: $page, limit: $limit, businessId: $businessId) {
      items {
        ...ServiceCardFragment
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

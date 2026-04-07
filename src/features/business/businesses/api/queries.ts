import { gql } from "@apollo/client";

export const HAS_BUSINESS_QUERY = gql`
  query HasBusiness($providerId: ID!) {
    hasBusiness(providerId: $providerId)
  }
`;

export const BUSINESSES_QUERY = gql`
  query Businesses($providerId: ID) {
    businesses(providerId: $providerId) {
      items {
        _id
        address
        logo
        name
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query Categories($parentIds: [ID!]) {
    categories(parentIds: $parentIds) {
      _id
      title {
        en
        uz
        ru
      }
      image
      childrenCount
    }
  }
`;

export const BUSINESS_CATEGORIES_QUERY = gql`
  query Business($businessId: ID!) {
    business(id: $businessId) {
      categories {
        _id
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const BUSINESS_PROFILE_QUERY = gql`
  query BusinessProfile($id: ID!) {
    business(id: $id) {
      _id
      name
      logo
      provider {
        _id
        fullName
        avatar
      }
    }
  }
`;

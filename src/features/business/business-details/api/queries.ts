import { gql } from "@apollo/client";

import { BUSINESS_DETAILS_FRAGMENT } from "./fragments";

export const BUSINESS_DETAILS_QUERY = gql`
  ${BUSINESS_DETAILS_FRAGMENT}
  query BusinessDetails($id: ID!) {
    business(id: $id) {
      ...BusinessDetailsFragment
    }
  }
`;

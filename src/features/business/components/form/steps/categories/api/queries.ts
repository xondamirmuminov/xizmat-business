import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
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

import { gql } from "@apollo/client";

export const DELETE_BUSINESS_MUTATION = gql`
  mutation DeleteBusiness($id: ID!) {
    deleteBusiness(id: $id)
  }
`;

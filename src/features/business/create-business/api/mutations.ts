import { gql } from "@apollo/client";

export const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness($data: CreateBusinessInput!) {
    createBusiness(data: $data) {
      _id
    }
  }
`;

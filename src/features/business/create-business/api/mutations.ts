import { gql } from "@apollo/client";

export const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness($data: CreateBusinessInput!) {
    createBusiness(data: $data) {
      _id
    }
  }
`;

export const UPDATE_BUSINESS_MUTATION = gql`
  mutation UpdateBusiness($id: ID!, $data: UpdateBusinessInput!) {
    updateBusiness(id: $id, data: $data) {
      _id
    }
  }
`;


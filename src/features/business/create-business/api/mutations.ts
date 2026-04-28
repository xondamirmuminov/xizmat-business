import { gql } from "@apollo/client";

import { BUSINESS_DETAILS_FRAGMENT } from "../../business-details/api/fragments";

export const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness($data: CreateBusinessInput!) {
    createBusiness(data: $data) {
      _id
    }
  }
`;

export const UPDATE_BUSINESS_MUTATION = gql`
  ${BUSINESS_DETAILS_FRAGMENT}
  mutation UpdateBusiness($id: ID!, $data: UpdateBusinessInput!) {
    updateBusiness(id: $id, data: $data) {
      ...BusinessDetailsFragment
    }
  }
`;


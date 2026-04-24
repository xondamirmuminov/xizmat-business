import { gql } from "@apollo/client";

export const CREATE_SERVICE_MUTATION = gql`
  mutation CreateService($data: CreateServiceInput!) {
    createService(data: $data) {
      ...ServiceCardFragment
    }
  }
`;

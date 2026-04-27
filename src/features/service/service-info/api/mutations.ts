import { gql } from "@apollo/client";

import { SERVICE_CARD_FRAGMENT } from "../../services/api/fragments";

export const DELETE_SERVICE_MUTATION = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;

export const UPDATE_SERVICE_MUTATION = gql`
  ${SERVICE_CARD_FRAGMENT}
  mutation UpdateService($id: ID!, $data: UpdateServiceInput!) {
    updateService(id: $id, data: $data) {
      ...ServiceCardFragment
    }
  }
`;

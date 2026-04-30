import { gql } from "@apollo/client";

export const PROVIDER_PAYMENTS_QUERY = gql`
  query ProviderPayments {
    payments {
      _id
      paymentCode
      month
      amount
      paidAmount
      status
      remaining
      provider {
        _id
      }
    }
  }
`;

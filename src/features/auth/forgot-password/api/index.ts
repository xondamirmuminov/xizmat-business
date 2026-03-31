import { gql } from "@apollo/client";

export const FORGOT_PASSWORD_QUERY = gql`
  query ForgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data) {
      token
    }
  }
`;

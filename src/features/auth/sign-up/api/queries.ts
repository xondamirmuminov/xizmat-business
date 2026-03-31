import { gql } from "@apollo/client";

export const SIGN_UP_QUERY = gql`
  query SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      token
      telegramBotUrl
    }
  }
`;

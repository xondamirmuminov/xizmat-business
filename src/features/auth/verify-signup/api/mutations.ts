import { gql } from "@apollo/client";

export const CONFIRM_SIGN_UP_MUTATION = gql`
  mutation ConfirmSignUp($code: String!, $token: String!) {
    confirmSignUp(code: $code, token: $token) {
      user {
        _id
        avatar
        expoPushTokens
        fullName
        isBlocked
        isPhoneConfirmed
        lastCoords {
          lat
          lon
        }
        phone
        role
        telegramId
      }
      token
    }
  }
`;

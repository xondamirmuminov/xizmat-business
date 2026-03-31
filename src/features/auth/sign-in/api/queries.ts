import { gql } from "@apollo/client";

export const SIGN_IN_QUERY = gql`
  query SignIn($data: SignInInput!) {
    signIn(data: $data) {
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

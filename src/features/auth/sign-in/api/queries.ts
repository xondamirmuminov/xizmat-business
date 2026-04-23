import { gql } from "@apollo/client";

export const SIGN_IN_AS_PROVIDER_QUERY = gql`
  query SignInAsProvider($data: SignInInput!) {
    signInAsProvider(data: $data) {
      role
      token
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
    }
  }
`;

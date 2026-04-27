import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      avatar
      blockReason
      blockedAt
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
`;

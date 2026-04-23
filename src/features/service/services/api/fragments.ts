import { gql } from "@apollo/client";

export const SERVICE_CARD_FRAGMENT = gql`
  fragment ServiceCardFragment on ProviderService {
    _id
    durationMinutes
    isRecommended
    price
    primaryImage
    title {
      en
      uz
      ru
    }
  }
`;

import { gql } from "@apollo/client";

/** Fields needed for Business details + profile + Apollo cache merge after `updateBusiness`. */
export const BUSINESS_DETAILS_FRAGMENT = gql`
  fragment BusinessDetailsFragment on Business {
    _id
    name
    logo
    thumbnail
    images
    address
    city
    province
    description
    phoneNumbers
    workingDays
    workingHours {
      from
      to
    }
    isProviderAvailable
    isActive
    isRecommended
    createdByAdmin
    isBlocked
    createdAt
    updatedAt
    coords {
      latitude
      longitude
    }
    categories {
      _id
      childrenCount
      title {
        en
        uz
        ru
      }
    }
    provider {
      _id
      fullName
      avatar
    }
  }
`;

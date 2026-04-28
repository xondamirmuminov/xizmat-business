import { gql } from "@apollo/client";

export const BUSINESS_DETAILS_QUERY = gql`
  query BusinessDetails($id: ID!) {
    business(id: $id) {
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
  }
`;

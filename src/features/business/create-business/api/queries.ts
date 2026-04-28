import { gql } from "@apollo/client";

export const BUSINESS_FOR_EDIT_QUERY = gql`
  query BusinessForEdit($id: ID!) {
    business(id: $id) {
      _id
      name
      address
      phoneNumbers
      workingDays
      workingHours {
        from
        to
      }
      coords {
        latitude
        longitude
      }
      categories {
        _id
      }
      socialMediaLinks {
        instagram
        telegram
        facebook
        youtube
        tiktok
        website
      }
    }
  }
`;

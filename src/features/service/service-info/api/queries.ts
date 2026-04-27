import { gql } from "@apollo/client";

export const SERVICE_QUERY = gql`
  query Service($serviceId: ID!) {
    service(id: $serviceId) {
      _id
      business {
        _id
        address
        logo
        name
      }
      price
      durationMinutes
      isActive
      isFavorite
      isRecommended
      createdAt
      updatedAt
      primaryImage
      images
      description
      categoryId
      category {
        _id
        childrenCount
        parentId
        image
        title {
          en
          uz
          ru
        }
      }
      title {
        en
        uz
        ru
      }
    }
  }
`;

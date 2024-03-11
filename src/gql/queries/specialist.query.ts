import { gql } from "@apollo/client";

const GET_SPECIALIST = gql`
  query ($locale: I18NLocaleCode!, $id: ID!) {
    specialist(locale: $locale, id: $id) {
      data {
        id
        attributes {
          fullName
          position
          description
          image {
            data {
              id
              attributes {
                width
                height
                url
                name
              }
            }
          }
        }
      }
    }
    specialists(locale: $locale, filters: { id: { ne: $id } }) {
      data {
        id
        attributes {
          fullName
          position
          image {
            data {
              id
              attributes {
                width
                height
                url
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_SPECIALIST;

import { gql } from "@apollo/client";

const GET_SPECIALISTS = gql`
  query ($locale: I18NLocaleCode!) {
    specialists(locale: $locale, pagination: { page: 1, pageSize: 1000 }) {
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

export default GET_SPECIALISTS;

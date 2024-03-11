import { gql } from "@apollo/client";

const GET_HEADS_APPEAL = gql`
  query ($locale: I18NLocaleCode!) {
    headsAppeal(locale: $locale) {
      data {
        id
        attributes {
          content
          fullName
          position
          image {
            data {
              id
              attributes {
                url
                name
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_HEADS_APPEAL;

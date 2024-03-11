import { gql } from "@apollo/client";

const GET_ABOUT_US = gql`
  query ($locale: I18NLocaleCode!) {
    aboutUs(locale: $locale) {
      data {
        attributes {
          content
        }
      }
    }
  }
`;

export default GET_ABOUT_US;

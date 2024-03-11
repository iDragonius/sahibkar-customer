import { gql } from "@apollo/client";

const GET_LAYOUT = gql`
  query ($locale: I18NLocaleCode!) {
    navigation(locale: $locale) {
      data {
        id
        attributes {
          navigations {
            id
            label
            path
            status
            hasLink
            subs {
              id
              path
              status
              label
              trainings {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    contact(locale: $locale) {
      data {
        id
        attributes {
          address
          phone
          email
        }
      }
    }
    socialLink {
      data {
        id
        attributes {
          links {
            url
            id
            icon {
              data {
                id
                attributes {
                  url
                  width
                  height
                  name
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_LAYOUT;

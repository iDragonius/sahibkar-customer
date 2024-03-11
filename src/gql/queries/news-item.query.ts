import { gql } from "@apollo/client";

const GET_NEWS_ITEM = gql`
  query ($locale: I18NLocaleCode!, $id: ID!) {
    news(id: $id, locale: $locale) {
      data {
        id
        attributes {
          thumbnail {
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
          assets {
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
          type
          title
          shortDescription
          content
          date
        }
      }
    }
    newss(
      filters: { id: { ne: $id } }
      sort: "date:desc"
      locale: $locale
      pagination: { page: 1, pageSize: 3 }
    ) {
      data {
        id
        attributes {
          thumbnail {
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
          assets {
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
          type
          title
          shortDescription
          content
          date
        }
      }
    }
  }
`;
export default GET_NEWS_ITEM;

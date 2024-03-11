import { gql } from "@apollo/client";

const GET_NEWS = gql`
  query ($locale: I18NLocaleCode!, $pageSize: Int!, $page: Int!) {
    newss(
      locale: $locale
      pagination: { pageSize: $pageSize, page: $page }
      sort: "date:desc"
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
          type
          title
          shortDescription
          date
        }
      }
    }
  }
`;
export default GET_NEWS;

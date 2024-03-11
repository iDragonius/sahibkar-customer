import { gql } from "@apollo/client";

const GET_KIV = gql`
  query {
    kiv {
      data {
        id
        attributes {
          images {
            id
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
          brandings {
            id
            description
            name
            file {
              data {
                id
                attributes {
                  url
                }
              }
            }
          }
          videos {
            id
            thumbnail {
              data {
                id
                attributes {
                  url
                  width
                  height
                  name
                }
              }
            }
            url
          }
        }
      }
    }
  }
`;
export default GET_KIV;

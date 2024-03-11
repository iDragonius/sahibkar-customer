import { gql } from "@apollo/client";

const GET_SUCCESSES_AND_CERTIFICATES = gql`
  query {
    successesAndCertificates {
      data {
        id
        attributes {
          pdf {
            data {
              attributes {
                url
              }
            }
          }
          image {
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
          name
        }
      }
    }
  }
`;

export default GET_SUCCESSES_AND_CERTIFICATES;

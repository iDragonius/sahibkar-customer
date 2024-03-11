import { gql } from "@apollo/client";

const GET_MISSIONS_AND_VISIONS = gql`
  query ($locale: I18NLocaleCode!) {
    missionsAndVision(locale: $locale) {
      data {
        id
        attributes {
          missions {
            id
            description
            title
          }
          visions {
            id
            description
            title
          }
        }
      }
    }
  }
`;
export default GET_MISSIONS_AND_VISIONS;

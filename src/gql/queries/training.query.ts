import { gql } from "@apollo/client";

const GET_TRAINING = gql`
  query ($locale: I18NLocaleCode!, $id: ID!) {
    training(id: $id, locale: $locale) {
      data {
        id
        attributes {
          price
          name
          duration
          participants
          mainInfo
          additionalInfo
          hasInfo
          lessonsCount
          image {
            data {
              id
              attributes {
                width
                height
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_TRAINING;

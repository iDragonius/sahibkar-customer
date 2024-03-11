import { gql } from "@apollo/client";

const CREATE_EMAIL_SUBSCRIPTION = gql`
  mutation ($email: String!) {
    createEmailSubscription(data: { email: $email }) {
      data {
        id
      }
    }
  }
`;

export default CREATE_EMAIL_SUBSCRIPTION;

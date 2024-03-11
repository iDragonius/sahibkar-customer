import { gql } from "@apollo/client";

const CREATE_TRAINING_APPEAL = gql`
  mutation (
    $message: String!
    $training: String!
    $fullName: String!
    $phoneNumber: String!
    $email: String!
  ) {
    createTrainingAppeal(
      data: {
        message: $message
        fullName: $fullName
        phoneNumber: $phoneNumber
        email: $email
        training: $training
      }
    ) {
      data {
        id
      }
    }
  }
`;
export default CREATE_TRAINING_APPEAL;

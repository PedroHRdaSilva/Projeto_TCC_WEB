import gql from "graphql-tag";

export default gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

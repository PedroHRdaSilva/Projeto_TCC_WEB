import gql from "graphql-tag";

export default gql`
  mutation UpdateUserPasswordMutation($password: String!) {
    updateUserPassword(password: $password)
  }
`;

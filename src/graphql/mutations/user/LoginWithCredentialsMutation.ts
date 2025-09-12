import gql from "graphql-tag";

export default gql`
  mutation LoginWithCredentials($email: String!, $password: String!) {
    loginWithCredentials(email: $email, password: $password) {
      accessToken
      email
    }
  }
`;

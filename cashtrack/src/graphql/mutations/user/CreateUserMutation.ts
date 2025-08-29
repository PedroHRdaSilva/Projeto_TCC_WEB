import gql from "graphql-tag";

export default gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput)
  }
`;

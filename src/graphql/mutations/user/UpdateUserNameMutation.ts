import gql from "graphql-tag";

export default gql`
  mutation UpdateUserNameMutation($name: String!) {
    updateUserName(name: $name)
  }
`;

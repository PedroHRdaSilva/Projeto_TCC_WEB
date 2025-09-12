import gql from "graphql-tag";

export default gql`
  mutation CreateTransactionGroup($input: CreateTransactionGroupInput!) {
    createTransactionGroup(input: $input) {
      _id
      owner {
        name
      }
      iconProperties {
        background
        color
        icon
      }
      description
    }
  }
`;

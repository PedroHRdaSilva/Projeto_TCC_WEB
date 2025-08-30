import gql from "graphql-tag";

export default gql`
  query TransactionsGroup($search: String) {
    transactionsGroup(search: $search) {
      _id
      owner {
        name
        _id
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

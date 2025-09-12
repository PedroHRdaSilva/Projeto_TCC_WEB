import gql from "graphql-tag";

export default gql`
  query TransactionGroupById($_id: ObjectID) {
    transactionGroupById(_id: $_id) {
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

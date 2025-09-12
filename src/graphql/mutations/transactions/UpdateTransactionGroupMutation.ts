import gql from "graphql-tag";

export default gql`
  mutation UpdateTransactionGroup(
    $id: ObjectID!
    $updateTransactionGroup: UpdateTransactionGroupInput!
  ) {
    updateTransactionGroup(_id: $id, input: $updateTransactionGroup) {
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

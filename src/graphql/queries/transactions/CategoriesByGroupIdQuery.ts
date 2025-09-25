import gql from "graphql-tag";

export default gql`
  query CategoriesByGroupId($transactionGroupId: ObjectID!) {
    categoriesByGroupId(transactionGroupId: $transactionGroupId) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
      isDefault
    }
  }
`;

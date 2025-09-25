import gql from "graphql-tag";

export default gql`
  query CreditCardByGroupId($transactionGroupId: ObjectID!) {
    creditCardByGroupId(transactionGroupId: $transactionGroupId) {
      _id
      transactionGroupId
      description
    }
  }
`;

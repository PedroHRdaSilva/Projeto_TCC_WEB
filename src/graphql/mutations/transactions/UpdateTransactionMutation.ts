import gql from "graphql-tag";

export default gql`
  mutation UpdateTransaction($id: ObjectID!, $input: TransactionInput!) {
    updateTransaction(_id: $id, input: $input) {
      _id
      transactionGroupId
      category {
        description
        _id
        iconProperties {
          background
          color
          icon
        }
        type
        isDefault
      }
      date
      description
      amount
      installments {
        total
        current
      }
      creditCard {
        _id
        transactionGroupId
        description
      }
    }
  }
`;

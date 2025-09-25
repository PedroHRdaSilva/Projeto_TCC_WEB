import gql from "graphql-tag";

export default gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      _id
      transactionGroupId
      category {
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

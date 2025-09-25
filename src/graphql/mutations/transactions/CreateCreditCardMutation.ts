import gql from "graphql-tag";

export default gql`
  mutation CreateCreditCard($input: CreditCardInput!) {
    createCreditCard(input: $input) {
      _id
      transactionGroupId
      description
    }
  }
`;

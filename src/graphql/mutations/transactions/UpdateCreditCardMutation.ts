import gql from "graphql-tag";

export default gql`
  mutation UpdateCreditCard($id: ObjectID!, $input: CreditCardInput!) {
    updateCreditCard(_id: $id, input: $input) {
      _id
      transactionGroupId
      description
      limit
      validity
    }
  }
`;

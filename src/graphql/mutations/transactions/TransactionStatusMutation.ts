import gql from "graphql-tag";

export default gql`
  mutation TransactionStatus($id: [ObjectID!]!, $status: TransactionStatus!) {
    transactionStatus(_id: $id, status: $status)
  }
`;

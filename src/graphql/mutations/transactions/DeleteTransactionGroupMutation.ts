import gql from "graphql-tag";

export default gql`
  mutation DeleteTransactionGroup($_id: ObjectID!) {
    deleteTransactionGroup(_id: $_id)
  }
`;

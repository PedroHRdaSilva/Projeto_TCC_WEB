import gql from "graphql-tag";

export default gql`
  mutation DeleteTransaction($id: ObjectID!) {
    deleteTransaction(_id: $id)
  }
`;

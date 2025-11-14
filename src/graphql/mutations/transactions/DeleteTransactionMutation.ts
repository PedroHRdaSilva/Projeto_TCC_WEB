import gql from "graphql-tag";

export default gql`
  mutation DeleteTransaction($_id: [ObjectID!]!) {
    deleteTransaction(_id: $_id)
  }
`;

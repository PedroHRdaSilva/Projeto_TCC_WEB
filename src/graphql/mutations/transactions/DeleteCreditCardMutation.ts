import gql from "graphql-tag";

export default gql`
  mutation DeleteCreditCard($id: ObjectID!) {
    deleteCreditCard(_id: $id)
  }
`;

import gql from "graphql-tag";

export default gql`
  mutation UpdateCategory($id: ObjectID!, $input: UpdateCustomInput!) {
    updateCategory(_id: $id, input: $input) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
    }
  }
`;

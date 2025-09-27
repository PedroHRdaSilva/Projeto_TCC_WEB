import gql from "graphql-tag";

export default gql`
  mutation DeleteCategory($id: ObjectID!, $groupId: ObjectID!) {
    deleteCategory(_id: $id, groupId: $groupId)
  }
`;

import gql from "graphql-tag";

export default gql`
  mutation CreateCategory($input: CreateCategoryCustomInput!) {
    createCategory(input: $input) {
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

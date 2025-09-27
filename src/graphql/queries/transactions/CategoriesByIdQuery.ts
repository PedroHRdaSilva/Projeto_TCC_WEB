import gql from "graphql-tag";

export default gql`
  query CategoriesById($categoryId: ObjectID!) {
    categoryById(categoryId: $categoryId) {
      _id
      description
      iconProperties {
        background
        color
        icon
      }
      type
      isDefault
    }
  }
`;

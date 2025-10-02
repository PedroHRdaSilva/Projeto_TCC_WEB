import gql from "graphql-tag";

export default gql`
  query Viewer {
    viewer {
      _id
      email
      name
    }
  }
`;

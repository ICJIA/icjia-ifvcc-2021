import gql from "graphql-tag";

const GET_ALL_PAGES_QUERY = gql`
  query getAllPages {
    pages(sort: "created_at:desc") {
      id
      slug
      title
    }
  }
`;

export { GET_ALL_PAGES_QUERY };

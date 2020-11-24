import gql from "graphql-tag";

const GET_ALL_COUNTIES_QUERY = gql`
  query getAllCounties {
    counties(sort: "name:asc") {
      id
      slug
      name
    }
  }
`;

export { GET_ALL_COUNTIES_QUERY };

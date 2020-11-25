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

const GET_SINGLE_COUNTY_QUERY = gql`
  query getSingleCounty($slug: String!) {
    counties(where: { slug: $slug }) {
      name
      slug
      councils {
        title
        slug
        summary
        published_at
        updatedAt
        body
        posts {
          title
          slug
          summary
          published_at
          updatedAt
        }
      }
    }
  }
`;

export { GET_ALL_COUNTIES_QUERY, GET_SINGLE_COUNTY_QUERY };

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

const GET_ALL_CIRCUITS_FOR_SELECT_QUERY = gql`
  query getAllCircuitsForSelect {
    councils(sort: "sortOrder:asc") {
      id
      name: title
      slug
      sortOrder
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

const GET_SINGLE_CIRCUIT_QUERY = gql`
  query getSingleCircuit($slug: String!) {
    councils(where: { slug: $slug }) {
      name: title
      body
      published_at
      createdAt
      updatedAt
      slug
      posts {
        title
        slug
        summary
        published_at
      }
    }
  }
`;

const GET_ALL_CIRCUITS_QUERY = gql`
  query getAllCircuits {
    councils {
      title
      body
      published_at
      createdAt
      updatedAt
      slug
      posts {
        title
        slug
        summary
        published_at
        updatedAt
      }
    }
  }
`;

export {
  GET_ALL_COUNTIES_QUERY,
  GET_SINGLE_COUNTY_QUERY,
  GET_ALL_CIRCUITS_QUERY,
  GET_ALL_CIRCUITS_FOR_SELECT_QUERY,
  GET_SINGLE_CIRCUIT_QUERY,
};

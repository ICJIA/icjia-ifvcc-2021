import gql from "graphql-tag";

const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts {
    posts(sort: "createdAt:desc") {
      id
      slug
      kicker
      title
      summary
      createdAt
      updatedAt
      splash {
        alternativeText
        caption
        formats
      }
    }
  }
`;

const GET_SINGLE_POST_QUERY = gql`
  query getSinglePost($slug: String!) {
    posts(where: { slug: $slug }) {
      id
      slug
      title
      summary
      kicker
      createdAt
      updatedAt
      body
      showTOC
      splash {
        alternativeText
        caption
        formats
      }
    }
  }
`;

export { GET_ALL_POSTS_QUERY, GET_SINGLE_POST_QUERY };

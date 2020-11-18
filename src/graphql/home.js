import gql from "graphql-tag";

const GET_HOME = gql`
  query Home($now: String!, $eventLimit: Int!, $postLimit: Int!) {
    home {
      id
      createdAt
      updatedAt

      slider {
        id
        slide {
          title
          url
          postingDate
          summary
          image {
            formats
          }
        }
      }
    }

    eventRange: events(
      limit: $eventLimit
      where: { start_lte: $now, end_gte: $now }
      sort: "start:asc"
    ) {
      id
      name
      start
      end
      timed
      summary
      details

      type
    }

    events(limit: $eventLimit, where: { start_gte: $now }, sort: "start:asc") {
      id
      name
      start
      end
      timed
      summary
      details

      type
    }

    posts(sort: "createdAt:desc", limit: $postLimit) {
      id
      title
      kicker
      slug
      summary
      body
      createdAt
      updatedAt
      splash {
        formats
      }
    }
  }
`;

export { GET_HOME };
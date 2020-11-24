import gql from "graphql-tag";

const GET_HOME = gql`
  query Home($now: String!, $eventLimit: Int!, $postLimit: Int!) {
    home {
      id
      createdAt
      updatedAt

      alert {
        type
        isDismissable
        text
      }

      infoDisplay {
        title
        body
        callToAction {
          text
          url
          icon
        }
      }

      featureBoxDisplay {
        featureBox {
          title
          url
          summary
        }
      }

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
      published_at
      splash {
        alternativeText
        caption
        formats
      }
    }
  }
`;

export { GET_HOME };

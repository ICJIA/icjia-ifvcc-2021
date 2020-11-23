import gql from "graphql-tag";

const GET_ALL_PAGES_QUERY = gql`
  query getAllPages {
    pages(sort: "createdAt:desc") {
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
      metaData {
        showTOC
        showInNav
        showInFooter
        showInSitemap
        showInSidebar
        menuTitle
        menuRank
        showBanner
      }
    }
  }
`;

const GET_SINGLE_PAGE_QUERY = gql`
  query getSinglePage($slug: String!) {
    pages(where: { slug: $slug }) {
      slug
      title
      summary
      kicker
      createdAt
      updatedAt
      body
      metaData {
        showTOC
        showInNav
        showInFooter
        showInSitemap
        showInSidebar
        menuTitle
        menuRank
        showBanner
      }
      splash {
        alternativeText
        caption
        formats
      }
    }
  }
`;

export { GET_ALL_PAGES_QUERY, GET_SINGLE_PAGE_QUERY };

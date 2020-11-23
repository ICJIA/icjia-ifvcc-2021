import gql from "graphql-tag";

const GET_NAV_META_QUERY = gql`
  query getNavMeta {
    pages {
      slug
      title
      metaData {
        showTOC
        showInNav
        showInFooter
        showInSitemap
        showInSidebar
        menuTitle
        menuRank
      }
    }
  }
`;

export { GET_NAV_META_QUERY };

import gql from "graphql-tag";

const GET_NAV_META_QUERY = gql`
  query getNavMeta {
    pages {
      slug
      title
      pathPrefix
      metaData {
        showTOC
        showInNav
        showInFooter
        showInSidebar
        menuTitle
        menuRank
      }
    }
  }
`;

export { GET_NAV_META_QUERY };

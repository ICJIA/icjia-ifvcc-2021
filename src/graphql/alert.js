import gql from "graphql-tag";

const GET_ALERT = gql`
  query Alert {
    home {
      createdAt
      updatedAt
      alert {
        text
        type
        isDismissable
      }
    }
  }
`;

export { GET_ALERT };

import { gql } from 'apollo-angular';

const GET_USER = gql`
  query GetUser(
    $id: ID!
  ) {
    getUser(
      id: $id
    ) {
      id
      name
    }
  }
`;

const AUTHENTICATE_BY_COOKIE = gql`
  query {
    authenticateByCookie {
      response {
          type,
          code
        }
        data {
          id,
          username,
          email,
        }
    }
  }
`;


const CONFIRM_USER = gql`
  query ConfirmUser(
    $id: ID!
    $confirmationCode: String!
  ) {
    confirmUser(
      id: $id
      confirmationCode: $confirmationCode
    ) {
      response {
        type,
        code
      }
    }
  }
`

export { GET_USER, CONFIRM_USER, AUTHENTICATE_BY_COOKIE  };

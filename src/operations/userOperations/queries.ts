import { gql } from 'apollo-angular';

const GET_USERS = gql`
  query GetUsers(
    $query: String!
  ) {
    getUsers(
      query: $query
    ) {
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
        friends {
          id,
          username
        },
        friendOf {
          id,
          username
        },
        movies {
          tmdb_id,
          original_title,
          title,
          poster_path,
        }
      }
    }
  }
`;

const GET_ALL_USERS = gql`
  query {
    getAllUsers {
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
      data {
        id,
        username,
        email,
      }
      response {
        type,
        code
      }
    }
  }
`

const GET_WATCHLIST_USER = gql`
  query GetWatchlistUser(
    $id: ID!
    $type: String!
  ) {
    getWatchlistUser(
      id: $id
      type: $type
    ) {
        data {
          id,
          username,
          friends {
            id
          }
          friendOf {
            id
          }
          movies {
            tmdb_id,
            original_title,
            title,
            poster_path,
            release_date
          }
        }
        response {
          type,
          code
        }
      }
    }
`



export { GET_ALL_USERS, GET_USERS, CONFIRM_USER, AUTHENTICATE_BY_COOKIE, GET_WATCHLIST_USER };

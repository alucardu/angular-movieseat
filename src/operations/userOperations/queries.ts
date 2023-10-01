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

const SEARCH_MOVIES = gql`
  query SearchMovies(
    $query: String!
  ) {
    searchMovies(
      query: $query
    ) {
      data {
        id,
        original_title,
        overview,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        cast {
          name
        }
        directors {
          name
        }
      }
      response {
        type,
        code
      }
    }
  }
`

export { GET_USER, CONFIRM_USER, AUTHENTICATE_BY_COOKIE, SEARCH_MOVIES  };

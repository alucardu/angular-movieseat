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
          movies {
            tmdb_id,
            original_title,
            title,
            poster_path,
          }
        }
        response {
          type,
          code
        }
      }
    }
`

const GET_MOVIE = gql`
  query GetMovie(
    $tmdb_id: ID!
  ) {
    getMovie(
      tmdb_id: $tmdb_id
    ) {
      data {
        id,
        tmdb_id,
        original_title,
        overview,
        tagline,
        certification,
        runtime,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        persons {
          job
          character
          person {
            name
            profile_path
          }
        }
        genres {
          name
        }
        clips {
          name,
          key
        }
      }
      response {
        type,
        code
      }
    }
  }
`;


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
        runtime,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        persons {
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

export { GET_ALL_USERS, GET_USERS, CONFIRM_USER, AUTHENTICATE_BY_COOKIE, SEARCH_MOVIES, GET_MOVIE, GET_WATCHLIST_USER  };

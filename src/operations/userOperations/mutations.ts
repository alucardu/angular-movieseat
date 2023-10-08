import { gql } from 'apollo-angular';

const LOGIN_USER = gql`
  mutation loginUser(
    $username: String!
    $password: String!
  ) {
    loginUser(
      username: $username
      password: $password
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

const ADD_FRIEND = gql`
  mutation addFriend(
    $id: ID!
  ) {
    addFriend(
      id: $id
    ) {
      response {
        type,
        code
      }
      data {
        id,
        username,
        email,
        friends {
          id
          username
        },
        friendOf {
          id
          username
        }
      }
    }
  }
`;

const REMOVE_FRIEND = gql`
  mutation removeFriend(
    $id: ID!
  ) {
    removeFriend(
      id: $id
    ) {
      response {
        type,
        code
      }
      data {
        id,
        username,
        email,
        friends {
          id
        },
        friendOf {
          id
        }
      }
    }
  }
`;

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(
      username: $username,
      email: $email,
      password: $password
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

const CREATE_MOVIE = gql`
  mutation createMovie(
    $movie: MovieInput!
  ) {
    createMovie(
      movie: $movie
    ) {
      response {
        type,
        code
      }
      data {
        id,
        original_title
      }
    }
  }
`

const ADD_MOVIE_TO_USER = gql`
  mutation addMovieToUser(
    $movie: MovieInput!
  ) {
    addMovieToUser(
      movie: $movie
    ) {
      response {
        type,
        code
      }
      data {
        id,
        original_title,
        title,
        poster_path,
        tmdb_id
      }
    }
  }
`

const REMOVE_MOVIE_FROM_USER = gql`
  mutation removeMovieFromUser(
    $movie: MovieInput!
  ) {
    removeMovieFromUser(
      movie: $movie
    ) {
      response {
        type,
        code
      }
      data {
        id,
        original_title,
        title,
        poster_path,
        tmdb_id
      }
    }
  }
`

export { CREATE_USER, LOGIN_USER, LOGOUT_USER, CREATE_MOVIE, ADD_MOVIE_TO_USER, REMOVE_MOVIE_FROM_USER, ADD_FRIEND, REMOVE_FRIEND };


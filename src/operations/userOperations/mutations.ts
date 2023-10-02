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

export { CREATE_USER, LOGIN_USER, LOGOUT_USER, CREATE_MOVIE };


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
        movies {
          tmdb_id,
          original_title,
          title,
          poster_path,
        }
        friends {
          id,
          username
        },
        friendOf {
          id,
          username
        },
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
        user {
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
          },
            movies {
            tmdb_id,
            original_title,
            title,
            poster_path,
          }
        },
        friend {
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
        user {
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
          },
            movies {
            tmdb_id,
            original_title,
            title,
            poster_path,
          }
        },
        friend {
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



export { CREATE_USER, LOGIN_USER, LOGOUT_USER, ADD_FRIEND, REMOVE_FRIEND };


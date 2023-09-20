import { gql } from 'apollo-angular';

const LOGIN_USER = gql`
  mutation loginUser(
    $email: String!
    $password: String!) {
      loginUser(
        email: $email
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

export { CREATE_USER, LOGIN_USER };


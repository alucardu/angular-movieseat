import { gql } from 'apollo-angular';

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
      message
      user {
        id,
        username,
        email,
      }
    }
  }
`;

export { CREATE_USER };


import { gql } from 'apollo-angular';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!) {
    createUser(username: $username, email: $email) {
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


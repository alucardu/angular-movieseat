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

const CONFIRM_USER = gql`
  query ConfirmUser(
    $id: ID!
    $confirmationCode: String!
  ) {
    confirmUser(
      id: $id
      confirmationCode: $confirmationCode
    )
  }
`

export { GET_USER, CONFIRM_USER  };

import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const userTypeDefs = gql`
  type ReturnObject {
    data: User,
    response: Response
  }

  type Response {
    type: String
    code: String,
  }

  type User {
    id: ID
    username: String
    email: String
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!
    ): ReturnObject
  }

  type Mutation {
    loginUser(
      email: String!
      password: String!
    ): ReturnObject
  }

  type Query {
    authenticateByCookie: ReturnObject
  }

  type Query {
    getUser(
      username: String!
    ): User
  }

  type Query {
    confirmUser(
      id: ID!
      confirmationCode: String!
    ): ReturnObject
  }
`

export default userTypeDefs

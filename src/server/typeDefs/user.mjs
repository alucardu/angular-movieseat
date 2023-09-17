import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const userTypeDefs = gql`
  type ReturnObject {
    user: User,
    message: String
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

  type Query {
    getUser(username: String!): User
  }
`

export default userTypeDefs

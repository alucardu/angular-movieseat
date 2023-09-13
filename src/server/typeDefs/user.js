import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
export const userTypeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
  }

  type Mutation {
    createUser(username: String!, email: String!): User
  }

  type Query {
    getUser(username: String!): User
  }
`

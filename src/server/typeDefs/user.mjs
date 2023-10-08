import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const userTypeDefs = gql`
  type ReturnObjectUser {
    data: User,
    response: Response
  }

  type ReturnObjectUsers {
    data: [User],
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
    movies: [Movie]
    friends: [User]
    friendOf: [User]
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!
    ): ReturnObjectUser
  }

  type Mutation {
    logoutUser: String
  }

  type Mutation {
    loginUser(
      username: String!
      password: String!
    ): ReturnObjectUser
  }

  type Mutation {
    addFriend(
      id: ID!
    ): ReturnObjectUser
  }

  type Mutation {
    removeFriend(
      id: ID!
    ): ReturnObjectUser
  }

  type Query {
    authenticateByCookie: ReturnObjectUser
  }

  type Query {
    getAllUsers: ReturnObjectUsers
  }

  type Query {
    getUsers(
      query: String!
    ): ReturnObjectUsers
  }

  type Query {
    confirmUser(
      id: ID!
      confirmationCode: String!
    ): ReturnObjectUser
  }
`

export default userTypeDefs

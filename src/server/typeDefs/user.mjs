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

  type ReturnObjectFriendAndUserObject {
    friend: User,
    user: User
  }

  type ReturnObjectFriendAndUser {
    data: ReturnObjectFriendAndUserObject
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

  input UserInput {
    id: ID
    username: String
    email: String
    movies: [MovieInput]
    friends: [UserInput]
    friendOf: [UserInput]
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
    ): ReturnObjectFriendAndUser
  }

  type Mutation {
    removeFriend(
      id: ID!
    ): ReturnObjectFriendAndUser
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

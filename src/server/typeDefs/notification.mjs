import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const notificationDefs = gql`
  type ReturnObjectNotification {
    response: Response
  }

  type ReturnObjectNotifications {
    response: Response
    data: [Notification]
  }

  type Response {
    type: String
    code: String,
  }

  type Notification {
    code: String
    read: Boolean
    type: String,
    movie: Movie
    receiver: [User]
    performer: User
  }

  input NotificationInput {
    code: String
    read: Boolean
    type: String,
    movie: MovieInput
    receiver: [UserInput]
    performer: UserInput
  }

  type Query {
    getAllNotifications: ReturnObjectNotifications
  }

  type Mutation {
    createNotification(
      notification: NotificationInput
    ): ReturnObjectNotification
  }

`

export default notificationDefs

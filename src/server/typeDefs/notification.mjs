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
    id: ID,
    code: String
    read: Boolean
    type: String,
    createdAt: String,
    movie: Movie
    review: Review
    receiver: [User]
    performer: User
  }

  input NotificationInput {
    id: ID,
    code: String
    read: Boolean
    type: String,
    createdAt: String,
    movie: MovieInput
    review: ReviewInput
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

  type Mutation {
    markNotificationAsRead(
      notification: NotificationInput
    ): ReturnObjectNotification
  }

  type Mutation {
    markAllNotificationsAsRead(
      notification: NotificationInput
    ): ReturnObjectNotifications
  }



`

export default notificationDefs

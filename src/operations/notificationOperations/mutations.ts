import { gql } from 'apollo-angular';

const CREATE_NOTIFICATION = gql`
  mutation createNotification(
    $notification: NotificationInput
  ) {
    createNotification(
      notification: $notification
    ) {
      response {
        type,
        code
      }
    }
  }
`;

const MARK_NOTIFICATION_AS_READ = gql`
  mutation markNotificationAsRead(
    $notification: NotificationInput
  ) {
    markNotificationAsRead(
      notification: $notification
    ) {
      response {
        type,
        code
      }
    }
  }
`;

const MARK_ALL_NOTIFICATION_AS_READ = gql`
  mutation markAllNotificationsAsRead(
    $notification: NotificationInput
  ) {
    markAllNotificationsAsRead(
      notification: $notification
    ) {
      data {
        id
        code
        read
        type
        createdAt
        movie {
          id
          title
          release_date
          tmdb_id
        }
        performer {
          id
          username
        }
      }
      response {
        type,
        code
      }
    }
  }
`;

const GET_ALL_NOTIFICATIONS = gql`
  query {
    getAllNotifications {
      response {
        type,
        code
      }
      data {
        id
        code
        read
        type
        createdAt
        movie {
          id
          title
          release_date
          tmdb_id
        }
        performer {
          id
          username
        }
      }
    }
  }
`;



export {CREATE_NOTIFICATION, GET_ALL_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ, MARK_ALL_NOTIFICATION_AS_READ };


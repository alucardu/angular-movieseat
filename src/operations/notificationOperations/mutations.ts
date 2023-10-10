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

const GET_ALL_NOTIFICATIONS = gql`
  query {
    getAllNotifications {
      response {
        type,
        code
      }
      data {
        code
        read
        type
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



export {CREATE_NOTIFICATION, GET_ALL_NOTIFICATIONS };


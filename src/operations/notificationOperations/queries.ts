import { gql } from 'apollo-angular';

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
        review {
          id
        }
      }
    }
  }
`;


export {GET_ALL_NOTIFICATIONS };

import { gql } from 'apollo-angular';

const GET_MOVIE_REVIEWS = gql`
  query GetMovieReviews(
    $movieId: String!
  ) {
    getMovieReviews(
      movieId: $movieId
    ) {
      data {
        id,
        content,
        user {
          username
        },
        movie {
          id,
          tmdb_id
        }
      }
      response {
        type,
        code
      }
    }
  }
`;

const GET_MOVIE_REVIEW = gql`
  query GetMovieReview(
    $reviewId: String!
  ) {
    getMovieReview(
      reviewId: $reviewId
    ) {
      data {
        id,
        content,
        createdAt
        user {
          id
          username
        },
        movie {
          id,
          tmdb_id,
          title,
          release_date
        }
      }
      response {
        type,
        code
      }
    }
  }
`;


export {GET_MOVIE_REVIEWS, GET_MOVIE_REVIEW };

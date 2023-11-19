import { gql } from 'apollo-angular';

const ADD_REVIEW_TO_MOVIE = gql`
  mutation addReviewToMovie(
    $content: String
    $movieId: String
  ) {
    addReviewToMovie(
      content: $content
      movieId: $movieId
    ) {
      response {
        type,
        code
      }
      data {
        id,
        movie {
          id,
          tmdb_id
        }
      }
    }
  }
`

const EDIT_MOVIE_REVIEW = gql`
  mutation editMovieReview(
    $content: String
    $reviewId: String
  ) {
    editMovieReview(
      content: $content
      reviewId: $reviewId
    ) {
      response {
        type,
        code
      }
      data {
        id,
        movie {
          id,
          tmdb_id
        }
      }
    }
  }
`

const REMOVE_REVIEW_FROM_MOVIE = gql`
  mutation removeReviewFromMovie(
    $reviewId: String
  ) {
    removeReviewFromMovie(
      reviewId: $reviewId
    ) {
      response {
        type,
        code
      }
      data {
        id,
      }
    }
  }
`

export { ADD_REVIEW_TO_MOVIE, EDIT_MOVIE_REVIEW, REMOVE_REVIEW_FROM_MOVIE };

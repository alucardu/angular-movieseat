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

export { ADD_REVIEW_TO_MOVIE };

import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const reviewTypeDefs = gql`
  type ReturnObjectReviews {
    data: [Review],
    response: Response
  }

  type ReturnObjectReview {
    data: Review,
    response: Response
  }

  type Review {
    id: ID
    content: String
    createdAt: String
    user: User
    movie: Movie
  }

  input ReviewInput{
    id: ID
    content: String
    movie: MovieInput
  }

  type Mutation {
    addReviewToMovie(
      content: String,
      movieId: String
    ): ReturnObjectReview
  }

  type Query {
    getMovieReview(
      reviewId: String
    ): ReturnObjectReview
  }

  type Query {
    getMovieReviews(
      movieId: String
    ): ReturnObjectReviews
  }
`

export default reviewTypeDefs

import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const movieTypeDefs = gql`
type ReturnObjectMovie {
    data: Movie,
    response: Response
  }

  type ReturnObjectMovies {
    data: [Movie],
    response: Response
  }

  type Response {
    type: String
    code: String,
  }

  type Person {
    name: String
  }

  input PersonInput {
    name: String
  }

  type Movie {
    id: String,
    original_title: String,
    overview: String,
    poster_path: String,
    release_date: String,
    title: String,
    vote_average: Float,
    backdrop_path: String,
    cast: [Person],
    directors: [Person],
  }

  input MovieInput {
    id: String,
    original_title: String,
    overview: String,
    poster_path: String,
    release_date: String,
    title: String,
    vote_average: Float,
    backdrop_path: String,
    cast: [PersonInput],
    directors: [PersonInput],
  }

  type Mutation {
    createMovie(
      movie: MovieInput
    ): ReturnObjectMovie
  }

  type Query {
    searchMovies(
      query: String!
    ): ReturnObjectMovies
  }
`

export default movieTypeDefs

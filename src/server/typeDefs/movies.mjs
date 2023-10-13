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

  type ReturnUserObject {
    data: User,
    response: Response
  }

  type Response {
    type: String
    code: String,
  }

  type Person {
    job: String
    character: String
    name: String
    person: PersonX
  }

  type PersonX {
    name: String
    profile_path: String
  }

  input PersonInput {
    job: String
    name: String
    character: String
    person: PersonInputX
  }

  input PersonInputX {
    name: String
    profile_path: String
  }

  type Clip {
    name: String,
    key: String,
  }

  input ClipInput {
    name: String,
    key: String,
  }

  type Genre {
    id: String,
    name: String
  }

  input GenreInput {
    id: String,
    name: String
  }

  type Movie {
    id: String,
    tmdb_id: String,
    original_title: String,
    overview: String,
    tagline: String,
    certification: String,
    added_at: String,
    runtime: Int,
    poster_path: String,
    release_date: String,
    title: String,
    vote_average: Float,
    backdrop_path: String,
    genres: [Genre]
    clips: [Clip]
    directors: [Person],
    persons: [Person]
  }

  input MovieInput {
    id: String,
    tmdb_id: String,
    original_title: String,
    overview: String,
    tagline: String,
    certification: String,
    added_at: String,
    runtime: Int,
    poster_path: String,
    release_date: String,
    title: String,
    vote_average: Float,
    backdrop_path: String,
    genres: [GenreInput]
    clips: [ClipInput]
    directors: [PersonInput],
    persons: [PersonInput]
  }

  type Mutation {
    createMovie(
      movie: MovieInput
    ): ReturnObjectMovie
  }

  type Mutation {
    addMovieToUser(
      movie: MovieInput
    ): ReturnObjectMovie
  }

  type Mutation {
    removeMovieFromUser(
      movie: MovieInput
    ): ReturnObjectMovie
  }

  type Query {
    getMovie(
      tmdb_id: ID!
    ): ReturnObjectMovie
  }

  type Query {
    getWatchlistUser(
      id: ID!
      type: String
    ): ReturnObjectUser
  }

  type Query {
    searchMovies(
      query: String!
    ): ReturnObjectMovies
  }

  type Query {
    getDiscoverMovies(
      type: String!
    ): ReturnObjectMovies
  }

  type Query {
    getPopularAmongFriends: ReturnObjectMovies
  }
`

export default movieTypeDefs

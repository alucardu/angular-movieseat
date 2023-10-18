import { gql } from 'apollo-angular';

const CREATE_MOVIE = gql`
  mutation createMovie(
    $movie: MovieInput!
  ) {
    createMovie(
      movie: $movie
    ) {
      response {
        type,
        code
      }
      data {
        id,
        original_title
      }
    }
  }
`

const ADD_MOVIE_TO_USER = gql`
  mutation addMovieToUser(
    $movie: MovieInput!
  ) {
    addMovieToUser(
      movie: $movie
    ) {
      response {
        type,
        code
      }
      data {
        id,
        original_title,
        title,
        poster_path,
        tmdb_id
      }
    }
  }
`

const REMOVE_MOVIE_FROM_USER = gql`
  mutation removeMovieFromUser(
    $movie: MovieInput!
  ) {
    removeMovieFromUser(
      movie: $movie
    ) {
      response {
        type,
        code
      }
      data {
        id,
        original_title,
        title,
        poster_path,
        tmdb_id
      }
    }
  }
`

export { CREATE_MOVIE, ADD_MOVIE_TO_USER, REMOVE_MOVIE_FROM_USER };

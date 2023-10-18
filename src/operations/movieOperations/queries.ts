import { gql } from 'apollo-angular';

const GET_MOVIE = gql`
  query GetMovie(
    $tmdb_id: ID!
  ) {
    getMovie(
      tmdb_id: $tmdb_id
    ) {
      data {
        id,
        tmdb_id,
        original_title,
        overview,
        tagline,
        certification,
        runtime,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        persons {
          job
          character
          person {
            name
            profile_path
          }
        }
        genres {
          name
        }
        clips {
          name,
          key
        }
      }
      response {
        type,
        code
      }
    }
  }
`;


const SEARCH_MOVIES = gql`
  query SearchMovies(
    $query: String!
  ) {
    searchMovies(
      query: $query
    ) {
      data {
        id,
        original_title,
        overview,
        runtime,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        persons {
          name
        }
        directors {
          name
        }
      }
      response {
        type,
        code
      }
    }
  }
`

const SEARCH_PERSONS = gql`
  query SearchPersons(
    $query: String!
  ) {
    searchPersons(
      query: $query
    ) {
      data {
        id,
        name,
        birthday,
        deathday,
        profile_path,
        movies {
          id,
          tmdb_id,
          original_title,
          overview,
          runtime,
          poster_path,
          release_date,
          title,
          vote_average,
          backdrop_path,
          persons {
            name
          }
        }
      }
      response {
        type,
        code
      }
    }
  }
`
const SEARCH_PERSON = gql`
  query SearchPerson(
    $id: ID!
  ) {
    searchPerson(
      id: $id
    ) {
      data {
        name,
        biography,
        profile_path,
        movies {
          id,
          tmdb_id,
          original_title,
          overview,
          runtime,
          poster_path,
          release_date,
          title,
          vote_average,
          backdrop_path,
          department,
          job,
          character
        }
      }
      response {
        type,
        code
      }
    }
  }
`

const DISCOVER_MOVIES = gql`
  query GetDiscoverMovies(
    $type: String!
  ) {
    getDiscoverMovies(
      type: $type
    ) {
      data {
        id,
        original_title,
        overview,
        runtime,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        persons {
          name
        }
        directors {
          name
        }
      }
      response {
        type,
        code
      }
    }
  }
`
const POPULAR_AMONG_FRIENDS = gql`
  query {
    getPopularAmongFriends {
      data {
        id,
        tmdb_id,
        original_title,
        overview,
        runtime,
        poster_path,
        release_date,
        title,
        vote_average,
        backdrop_path,
        persons {
          name
        }
        directors {
          name
        }
      }
      response {
        type,
        code
      }
    }
  }
`

export {SEARCH_MOVIES, GET_MOVIE, DISCOVER_MOVIES, POPULAR_AMONG_FRIENDS, SEARCH_PERSONS, SEARCH_PERSON };

import { PrismaClient, Prisma  } from '@prisma/client'
import fetch from 'node-fetch'

const prisma = new PrismaClient()

const movieResolvers = {
  Query: {
    searchMovies: async(_, args) => {
      let movies = await getMovies(args.query)
      const filteredMovies = filterMovies(movies.results, args.query)
      const sortedMovies = sortMoviesOnReleaseDate(filteredMovies)
      const directorAndCastInfo = await getMovieCredits(sortedMovies)

      movies = sortedMovies.map((movie, i) => {
        return { ...movie, directors: directorAndCastInfo.directors[i].slice(0, 2), cast: directorAndCastInfo.cast[i].slice(0, 2)}
      })

      if (movies.length > 0) {
        return {
          data: movies,
          response: {
            type: 'movie',
            code: 'M_01',
          }
        }
      } else {
        return {
          data: [],
          response: {
            type: 'movie',
            code: 'M_02',
          }
        }
      }
    },
  }
}

export default movieResolvers;

async function getMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGY3MDM5NjMzZjIwNjU5NDJjZDhhMjhkN2NhZGFkNCIsInN1YiI6IjRlMjIxNDBjNWU3M2Q2MGNlMzAwMDMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1BCzbE3Sz1W8SRlps4nq0BF16Xt5rbNc4O5NxT8S3Y0'
    }
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

async function getMovieCredits(movies) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGY3MDM5NjMzZjIwNjU5NDJjZDhhMjhkN2NhZGFkNCIsInN1YiI6IjRlMjIxNDBjNWU3M2Q2MGNlMzAwMDMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1BCzbE3Sz1W8SRlps4nq0BF16Xt5rbNc4O5NxT8S3Y0'
    }
  };

  const movieCredits = await Promise.all(movies.map(async (movie) => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US', options`;

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }))

  const directors = filterCreditsDirector(movieCredits)
  const cast = filterCreditsCast(movieCredits)

  return { directors, cast };
}

function filterMovies(movies, query) {
  const filtededMovies = movies
    .filter((movie) => movie.poster_path !== null)
    .filter((movie => String(movie.popularity).replace('.', '') > 1000))
    .filter((movie => filterByTitleCheck(movie, query)))

    console.log(filtededMovies)

  return filtededMovies;
}

function filterCreditsDirector(movies) {
return movies.map((movie) => movie.crew.filter((crew) => crew.job === 'Director'))
}

function filterCreditsCast(movies) {
  return movies.map((movie) => { return movie.cast})
}

function filterByTitleCheck(movie, query) {
  const movieTitleWords = movie.title.toLowerCase().split(/\s+/);
  const queryWords = query.toLowerCase().split(/\s+/)

  for (const movieTitleWord of movieTitleWords) {
    for (const queryWord of queryWords) {
      if (movieTitleWord.includes(queryWord) || queryWord.includes(movieTitleWord)) {
        return movie
      }
    }
  }
}

function sortMoviesOnReleaseDate(movies) {
  const sortedMovies = movies.sort((a, b) => {
    const dateA = new Date(a.release_date)
    const dateB = new Date(b.release_date)

    return dateB - dateA
  });

  return sortedMovies
}

import { PrismaClient, Prisma  } from '@prisma/client'
import { filterMovies, getMovieCredits, getMovies, sortMoviesOnReleaseDate } from '../movieUtils.mjs'

const prisma = new PrismaClient()

const movieResolvers = {
  Mutation: {
    createMovie: async(_, args) => {
      return {
        data: args.movie,
        response: {
          type: 'movie',
          code: 'M_03'
        }
      }
    }
  },

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


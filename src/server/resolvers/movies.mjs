import { PrismaClient, Prisma  } from '@prisma/client'
import { sortMoviesOnAddedDate, filterClips, filterMovies, filterReleaseDatesAndCertifications, getMoviesCredits, getMovies, sortMoviesOnReleaseDate, getMovieCredits, getMovieDetails, getDiscoveredMovies } from '../movieUtils.mjs'
import { validateAccessToken } from '../jwt.mjs'

const prisma = new PrismaClient()

const movieResolvers = {
  Mutation: {
    createMovie: async(_, args) => {
      const moviesWithDetails = await getMovieDetails(args.movie.id)
      const releaseDatesAndCertifications = await filterReleaseDatesAndCertifications(args.movie.id)
      const clips = filterClips(moviesWithDetails.videos.results)
      const genres = moviesWithDetails.genres
      const credits = await getMovieCredits(args.movie.id)

      const combinedCredits = [...credits.castCredit, ...credits.crewCredit];

      try {
        const movieAndPersons = await prisma.$transaction(async (prisma) => {
          await prisma.person.createMany({
            data: credits.castPerson,
            skipDuplicates: true,
          });

          await prisma.person.createMany({
            data: credits.crewPerson,
            skipDuplicates: true,
          });

          const movie = await prisma.movie.create({
            data: {
              title: args.movie.title,
              original_title: args.movie.original_title,
              tmdb_id: args.movie.id,
              backdrop_path: args.movie.backdrop_path,
              certification: releaseDatesAndCertifications.certification,
              overview: args.movie.overview,
              poster_path: args.movie.poster_path,
              release_date: args.movie.release_date,
              runtime: moviesWithDetails.runtime,
              tagline: moviesWithDetails.tagline,
              vote_average: args.movie.vote_average,
              clips: {
                create: clips,
              },
              genres: {
                connectOrCreate: genres.map((genre) => ({
                  where: { name: genre.name },
                  create: { name: genre.name },
                })),
              },
              persons: {
                connectOrCreate: combinedCredits.map((credit) => ({
                  where: { id: credit.tmdb_id },
                  create: {
                    credit_id: credit.credit_id,
                    department: credit.department,
                    job: credit.job,
                    cast_id: credit.cast_id,
                    character: credit.character,
                    order: credit.order,
                    person: {
                      connect: {
                        tmdb_id: credit.tmdb_id,
                      },
                    },
                  },
                })),
              },
            },
          });

          return { movie };
        });

        return {
          data: movieAndPersons.movie,
          response: {
            type: 'movie',
            code: 'M_03',
          },
        };

      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code);
        } else {
          console.log('Error: ', e);
          throw e;
        }
      }
    },

    addMovieToUser: async(_, args, {req, res}) => {
      const userId = validateAccessToken(req.cookies.authToken).user.id

      const existingRelation = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          movies: {
            where: {
              tmdb_id: args.movie.tmdb_id || args.movie.id
            },
          },
        },
      });

      if (existingRelation.movies.length > 0) {
        throw new Error('U_10')
      }

      const movieId = args.movie.tmdb_id || args.movie.id
      const moviesWithDetails = await getMovieDetails(movieId)
      const releaseDatesAndCertifications = await filterReleaseDatesAndCertifications(movieId)
      const clips = filterClips(moviesWithDetails.videos.results)
      const genres = moviesWithDetails.genres
      const credits = await getMovieCredits(movieId)

      const combinedCredits = [...credits.castCredit, ...credits.crewCredit];

      try {
        const movie = await prisma.$transaction(async (prisma) => {
          await prisma.person.createMany({
            data: credits.castPerson,
            skipDuplicates: true,
          });

          await prisma.person.createMany({
            data: credits.crewPerson,
            skipDuplicates: true,
          });

          await prisma.user.update({
            where: { id: userId },
            data: {
              movies: {
                connectOrCreate: {
                  where: {
                    tmdb_id: args.movie.tmdb_id || args.movie.id
                  },
                  create: {
                    title: args.movie.title,
                    original_title: args.movie.original_title,
                    tmdb_id: args.movie.tmdb_id || args.movie.id,
                    backdrop_path: args.movie.backdrop_path,
                    certification: releaseDatesAndCertifications.certification,
                    overview: args.movie.overview,
                    poster_path: args.movie.poster_path,
                    release_date: args.movie.release_date,
                    runtime: moviesWithDetails.runtime,
                    tagline: moviesWithDetails.tagline,
                    vote_average: args.movie.vote_average,
                    clips: {
                      create: clips,
                    },
                    genres: {
                      connectOrCreate: genres.map((genre) => ({
                        where: { name: genre.name },
                        create: { name: genre.name },
                      })),
                    },
                    persons: {
                      connectOrCreate: combinedCredits.map((credit) => ({
                        where: { id: credit.tmdb_id },
                        create: {
                          credit_id: credit.credit_id,
                          department: credit.department,
                          job: credit.job,
                          cast_id: credit.cast_id,
                          character: credit.character,
                          order: credit.order,
                          person: {
                            connect: {
                              tmdb_id: credit.tmdb_id,
                            },
                          },
                        },
                      })),
                    },
                  },
                }
              }
            }
          })

          return prisma.movie.findFirst({
            where: {tmdb_id: args.movie.tmdb_id || args.movie.id }
          })

        })

        return {
          data: movie,
          response: {
            type: 'movie',
            code: 'U_08'
          }
        }
      } catch(e) {
        console.log(e)
        throw(e)
      }
    },

    removeMovieFromUser: async(_, args, {req, res}) => {
      const userId = validateAccessToken(req.cookies.authToken).user.id
      try {
        await prisma.user.update({
          where: {id: userId},
          data: {
            movies: {
              disconnect: {
                tmdb_id: args.movie.tmdb_id || args.movie.id
              }
            }
          }
        })

        const movie = await prisma.movie.findFirst({
          where: {
            tmdb_id: args.movie.tmdb_id || args.movie.id
          }
        })

        return {
          data: movie,
          response: {
            type: 'movie',
            code: 'U_09'
          }
        }
      } catch(e) {
        throw(e)
      }
    },
  },

  Query: {
    getWatchlistUser: async(_, args, {req, res}) => {
      if (!req.cookies.authToken) {
        return {
          response: {
            type: 'user',
            code: 'U_05',
          }
        }
      }

      const userId = validateAccessToken(req.cookies.authToken).user.id

      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: args.type === 'internal' ? userId : Number(args.id)
          },
          include: {
            movies: {
              orderBy: {
                release_date: 'asc'
              }
            },
            friendOf: true,
          },
        })

        return {
          data: user,
          response: {
            type: 'user',
            code: 'U_07'
          }
        }
      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        } else {
          console.log(e)
          throw e
        }
      }
    },

    getMovie: async(_, args) => {
      try {
        const movie = await prisma.movie.findUniqueOrThrow({
          where: {
            tmdb_id: args.tmdb_id
          },
          include: {
            clips: true,
            genres: true,
            persons: {
              include: {
                person: true
              }
            }
          }
        })

        return {
          data: movie,
          response: {
            type: 'movie',
            code: 'M_04'
          }
        }
      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        } else {
          console.log(e)
          throw e
        }
      }
    },

    searchMovies: async(_, args) => {
      let movies = await getMovies(args.query, 'movieSearch')

      const filteredMovies = filterMovies(movies.results, args.query)
      const sortedMovies = sortMoviesOnReleaseDate(filteredMovies)
      const directorAndCastInfo = await getMoviesCredits(sortedMovies)

      movies = sortedMovies.map((movie, i) => {
        return { ...movie, directors: directorAndCastInfo.directors[i].slice(0, 2), persons: directorAndCastInfo.cast[i].slice(0, 2)}
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

    searchPerson: async(_, args) => {
      let person = await getMovies(args.id, 'personSearch')

      person.movies = sortMoviesOnReleaseDate(person.movie_credits.crew).reverse()
      console.log(person.movies)

      return {
        data: person,
        response: {
          type: 'movie',
          code: 'M_06'
        }
      }
    },

    searchPersons: async(_, args) => {
      let movies = await getMovies(args.query, 'personsSearch')

      return {
        data: movies,
        response: {
          type: 'movie',
          code: 'M_05'
        }
      }

    },

    getDiscoverMovies: async(_, args) => {
      let movies = await getDiscoveredMovies(args.type);

      return {
        data: movies,
        response: {
          type: 'movie',
          code: 'M_15'
        }
      }
    },

    getPopularAmongFriends: async (_, args, {req, res}) => {
      if (!req.cookies.authToken) {
        return {
          response: {
            type: 'movie',
            code: 'U_05',
          }
        }
      }

      const userId = validateAccessToken(req.cookies.authToken).user.id

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          friends: {
            include: {
              movies: true,
            },
          },
        },
      });

      let movies = sortMoviesOnAddedDate(user.friends).map((friend) => friend.movies).flat().slice(0, 30)

      movies = sortMoviesOnAddedDate(Array.from(
        movies.reduce((map, obj) => {
          map.set(obj.tmdb_id, obj);
          return map;
        }, new Map()).values()
      ));

      return {
        data: movies,
        response: {
          type: 'movie',
          code: 'U_06'
        }
      }
    }
  }
}

export default movieResolvers;


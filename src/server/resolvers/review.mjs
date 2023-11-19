import { PrismaClient, Prisma  } from '@prisma/client'
import { validateAccessToken } from '../jwt.mjs'

const prisma = new PrismaClient()

const reviewResolvers = {
  Mutation: {
    addReviewToMovie: async(_, args, {req, res}) => {
      const userId = validateAccessToken(req.cookies.authToken).user.id

      try {
        const review = await prisma.review.create({
          data: {
            content: args.content,
            user: {
              connect: {
                id: userId
              }
            },
            movie: {
              connect: {
                tmdb_id: args.movieId
              }
            },
          },
          include: {
            movie: true
          }
        });

        return {
          data: review,
          response: {
            type: 'review',
            code: 'R_01'
          }
         };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code);
        } else {
          throw e;
        }
      }
    },

    removeReviewFromMovie: async(_, args) => {
      try {
        const review = await prisma.review.delete({
          where: {
            id: Number(args.reviewId)
          }
        })

        return {
          data: review,
          response: {
            type: 'review',
              code: 'R_05'
          }
        }
      } catch(e) {
        console.log(e)
      }
    },

    editMovieReview: async(_, args) => {
      console.log(args)
      try {
        const review = await prisma.review.update({
          where: { id: Number(args.reviewId) },
          data: { content: args.content },
        })

        return {
          data: review,
          response: {
            type: 'review',
              code: 'R_06'
          }
        }
      } catch(e) {
        console.log(e)
      }
    },
  },


  Query: {
    getMovieReviews: async(_, args) => {
      try {
        const reviews = await prisma.review.findMany({
          where: {
           movie: {
            tmdb_id: args.movieId
           }
          },
          include: {
            user: true,
            movie: true
          }
        })

        return {
          data: reviews,
          response: {
            type: 'review',
              code: 'R_02'
          }
        }

      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code);
        } else {
          throw e;
        }
      }
    },

    getMovieReview: async(_, args) => {
      try {
        const review = await prisma.review.findUnique({
          where: {
            id: Number(args.reviewId)
          },
          include: {
            user: true,
            movie: true
          }
        })

        return {
          data: review,
          response: {
            type: 'review',
              code: 'R_03'
          }
        }

      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code);
        } else {
          throw e;
        }
      }
    }
  }
}

export default reviewResolvers

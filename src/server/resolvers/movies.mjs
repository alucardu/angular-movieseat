import { PrismaClient, Prisma  } from '@prisma/client'

const prisma = new PrismaClient()

const movieResolvers = {
  Query: {
    searchMovies: async(_, args) => {
      console.log(args.query)
    },
  }
}

export default movieResolvers;



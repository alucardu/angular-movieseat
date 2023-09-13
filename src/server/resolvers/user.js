import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      return await prisma.user.create({
        data: {
          username: args.username,
          email: args.email
        },
      })

    },
  },
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      const user = await prisma.user.create({
        data: {
          username: args.username,
          email: args.email
        },
      })
      console.log(user)
    },
  },
}

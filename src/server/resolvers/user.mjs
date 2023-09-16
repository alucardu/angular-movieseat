import { PrismaClient, Prisma  } from '@prisma/client'

const prisma = new PrismaClient()

const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      try {
        const user = await prisma.user.create({
          data: {
            email: args.email,
            username: args.username,
          },
        })
        return {
          user: user,
          message: 'U_01'
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        }
      }
    },
  },
}

export default userResolvers;

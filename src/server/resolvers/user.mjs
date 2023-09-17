import { PrismaClient, Prisma  } from '@prisma/client'
import bcrypt from 'bcrypt'
import msg from '../../server/email/sendMail.js'

const prisma = new PrismaClient()

const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      try {
        const user = await prisma.user.create({
          data: {
            email: args.email,
            username: args.username,
            password: bcrypt.hashSync(args.password, 3),
          },
        })

        const email = {
          from: '"moviese.at" <info@moviese.at>', // sender address
          to: args.email, // list of receivers
          subject: 'Activate your Movieseat account!', // Subject line
          // eslint-disable-next-line max-len
          html: `Account has been created`, // html body
        };
        msg.main(email);

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

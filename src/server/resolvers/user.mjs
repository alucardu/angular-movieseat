import { PrismaClient, Prisma  } from '@prisma/client'
import bcrypt from 'bcrypt'
import msg from '../../server/email/sendMail.js'
import { customAlphabet } from 'nanoid'

  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // You can customize this character set
  const nanoid  = customAlphabet(alphabet, 4);

const prisma = new PrismaClient()

const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      const confirmation_code = nanoid()
      try {
        const user = await prisma.user.create({
          data: {
            email: args.email,
            username: args.username,
            password: bcrypt.hashSync(args.password, 3),
            confirmation_code: confirmation_code,
          },
        })

        const email = {
          from: '"moviese.at" <info@moviese.at>', // sender address
          to: args.email, // list of receivers
          subject: 'Activate your Movieseat account!', // Subject line
          // eslint-disable-next-line max-len
          html: `Account has been created. This is your confirmation code ${confirmation_code}. Click <a href="http://moviese.at/sign-up?id=${user.id}&confirmationCode=${confirmation_code}">here</a> to validate your account!`, // html body
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

  Query: {
    confirmUser: async (_, args) => {
      console.log(args.confirmationCode)
      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            id: Number(args.id),
            confirmation_code: args.confirmationCode
          }
        })

        await prisma.user.update({
          where: { id: Number(args.id) },
          data: { confirmation_code: '' },
        });

        return 'U_02'
      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        }
      }
    }
  }
}

export default userResolvers;



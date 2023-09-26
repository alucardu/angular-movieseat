import { PrismaClient, Prisma  } from '@prisma/client'
import bcrypt from 'bcrypt'
import msg from '../../server/email/sendMail.js'
import { customAlphabet } from 'nanoid'
import { setTokens, validateAccessToken } from '../jwt.mjs';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid  = customAlphabet(alphabet, 4);

const prisma = new PrismaClient()

const userResolvers = {
  Mutation: {
    loginUser: async (_, args, {req, res}) => {
      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            email: String(args.email),
          },
        });

        if (user.confirmation_code.length > 0) throw new Error('U_05')
        if (!bcrypt.compareSync(args.password, user.password)) throw new Error('U_04')

        const tokens = setTokens(user)
        console.log('login: ', tokens)
        res.cookie('authToken', tokens.accessToken, { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true, secure: true, sameSite: 'none' });

        return {
          data: user,
          response: {
            type: 'user',
            code: 'U_03',
          }
        }

      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        } else {
          console.log('login error: ', e)
          throw e
        }
      }
    },

    logoutUser: async (_, args, {req, res}) => {
      res.clearCookie('authToken');
    },

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
          from: '"moviese.at" <info@moviese.at>',
          to: args.email,
          subject: 'Activate your Movieseat account!',
          // eslint-disable-next-line max-len
          html: `Account has been created. This is your confirmation code ${confirmation_code}. Click <a href="http://moviese.at/sign-up?id=${user.id}&confirmationCode=${confirmation_code}">here</a> to validate your account!`, // html body
        };
        msg.main(email);

        return {
          data: user,
          response: {
            type: 'user',
            code: 'U_01'
          }
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        }
      }
    },
  },

  Query: {
    authenticateByCookie: async (_, args, {req, res}) => {
      console.log('auth by cookies: ', req.cookies)
      if (!req.cookies.authToken) {
        return {
          response: {
            type: 'user',
            code: 'U_05',
          }
        }
      }

      const oldToken = validateAccessToken(req.cookies.authToken)

      const tokens = setTokens({ id: oldToken.user.id})
      res.cookie('authToken', tokens.accessToken, { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true, secure: true, sameSite: 'none' });

      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            id: tokens.id
          }
        })

        return {
          data: user,
          response: {
            type: 'user',
            code: 'U_03',
          }
        }
      } catch(e) {}
    },

    confirmUser: async (_, args) => {
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

        return {
          response: {
            type: 'user',
            code: 'U_02'
          }
        }
      } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new Error(e.code)
        }
      }
    }
  }
}

export default userResolvers;



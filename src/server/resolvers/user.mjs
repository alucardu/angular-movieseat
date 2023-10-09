import { PrismaClient, Prisma  } from '@prisma/client'
import bcrypt from 'bcrypt'
import msg from '../../server/email/sendMail.js'
import { customAlphabet } from 'nanoid'
import { setTokens, validateAccessToken } from '../jwt.mjs';

const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
const nanoid  = customAlphabet(alphabet, 4);

const prisma = new PrismaClient()

const userResolvers = {
  Mutation: {
    addFriend: async(_, args, {req, res}) => {
      const userId = validateAccessToken(req.cookies.authToken).user.id

      if (userId === Number(args.id)) {
        throw new Error('U_14')
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          friends: {
            connect: { id: Number(args.id) },
          },
        },
        include: {
          friends: true,
          friendOf: true,
          movies: true
        }
      });

      return {
        data: user,
        response: {
          type: 'user',
          code: 'U_13',
        }
      }
    },

    removeFriend: async(_, args, {req, res}) => {
      const userId = validateAccessToken(req.cookies.authToken).user.id

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          friends: {
            disconnect: { id: Number(args.id) },
          },
        },
        include: {
          friends: true,
          friendOf: true,
          movies: true
        }
      });

      return {
        data: user,
        response: {
          type: 'user',
          code: 'U_14',
        }
      }
    },

    loginUser: async (_, args, {req, res}) => {
      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            username: String(args.username),
          },
        });

        if (user.confirmation_code.length > 0) throw new Error('U_05')
        if (!bcrypt.compareSync(args.password, user.password)) throw new Error('U_04')

        const tokens = setTokens(user)
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
          variables: {
            type: 'confirmation',
            user: user,
            confirmationCode: confirmation_code
          }
        };

        msg.sendEmail(email);

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
    getUsers: async(_, args) => {
      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: args.query
            }
          }
        });

        return {
          data: users,
          response: {
            type: 'user',
            code: 'U_12'
          }
        }
      } catch(e) {
        throw new Error(e)
      }
    },

    getAllUsers: async(_, args) => {
      try {
        const users = await prisma.user.findMany();

        return {
          data: users,
          response: {
            type: 'user',
            code: 'U_11'
          }
        }
      } catch(e) {
        throw new Error(e)
      }
    },

    authenticateByCookie: async (_, args, {req, res}) => {
      if (!req.cookies.authToken) {
        return {
          response: {
            type: 'user',
            code: 'U_05',
          }
        }
      }

      console.log(req.cookies.authToken)

      const oldToken = validateAccessToken(req.cookies.authToken)

      const tokens = setTokens({ id: oldToken.user.id})
      res.cookie('authToken', tokens.accessToken, { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true, secure: true, sameSite: 'none' });
      const userID = tokens.id || 0

      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            id: userID
          },
          include: {
            friendOf: true,
            friends: true,
            movies: true
          }
        })

        return {
          data: user,
          response: {
            type: 'user',
            code: 'U_03',
          }
        }
      } catch(e) {
        console.log(e)
        res.cookie('authToken', '', { maxAge: 1, httpOnly: true, secure: true, sameSite: 'none' });
        return {
          response: {
            type: 'sign_in',
            code: 'U_06',
          }
        }
      }
    },

    confirmUser: async (_, args, {req, res}) => {
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

        const tokens = setTokens(user)
        res.cookie('authToken', tokens.accessToken, { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true, secure: true, sameSite: 'none' });

        return {
          data: user,
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



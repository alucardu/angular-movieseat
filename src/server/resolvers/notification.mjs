import { PrismaClient, Prisma  } from '@prisma/client'
import { validateAccessToken } from '../jwt.mjs'


const prisma = new PrismaClient()

const notificationResolvers = {
  Mutation: {
    createNotification: async(_,args) => {
      try {
        await prisma.notification.create({
          data: {
            code: args.notification.code,
            read: args.notification.read,
            type: args.notification.type,
            movie: {
              connect: {
                tmdb_id: args.notification.movie.tmdb_id
              }
            },
            performer: {
              connect: {
                id: Number(args.notification.performer.id)
              }
            },
            receiver: {
              connect: args.notification.performer.friends.map((friend) => ({ id: Number(friend.id) })),
            }
          }
        })

        return {
          response: {
            type: 'notification',
            code: 'N_02'
          }
        }
      } catch(e) {
        console.log(e)
      }
    }
  },

  Query: {
    getAllNotifications: async(_, args, {req, res}) => {
      const userId = validateAccessToken(req.cookies.authToken).user.id

      try {
        const notifications = await prisma.notification.findMany({
          where: {
            receiver: {
              every: {
                id: userId
              }
            }
          },
          include: {
            movie: true,
            performer: true
          }
        })

        return {
          data: notifications,
          response: {
            type: 'notification',
            code: 'N_03'
          },

        }
      } catch(e) {
        console.log(e)
      }
    }
  }
}

export default notificationResolvers;
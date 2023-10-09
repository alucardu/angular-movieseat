import { INotification } from "src/app/mock/notifications.json"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObjectNotification = {
  response: IResponse,
}

type ReturnObjectNotifications = {
  response: IResponse,
  data: INotification[]
}

// QUERIES
export type GetAllNotifications = {
  getAllNotifications: ReturnObjectNotifications
}

// MUTATIONS
export type CreateNotification = {
  createMovies: ReturnObjectNotification
}

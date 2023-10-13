import { IUser } from "../components/authentication/sign-up/sign-up.service"
import { IMovie } from "./watchlist.json"

export interface INotification {
  id: number,
  read: boolean,
  code: string,
  type: string,
  createdAt: Date,
  receiver?: IUser,
  performer: IUser,
  movie?: IMovie
}

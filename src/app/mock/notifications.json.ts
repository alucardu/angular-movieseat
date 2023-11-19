import { IUser } from "../components/authentication/sign-up/sign-up.service"
import { IMovieReview } from "../components/features/movie-details/movie-reviews/movie-reviews.service"
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
  review?: IMovieReview
}

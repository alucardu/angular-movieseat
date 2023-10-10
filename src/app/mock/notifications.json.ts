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

export const notifications: INotification[] = [
  {
    id: 1,
    code: 'N_01',
    read: false,
    type: '',
    createdAt: new Date,
    movie: {
      backdrop_path: '',
      certification: '',
      clips: [],
      directors: [],
      genres: [],
      id: 1,
      original_title: '',
      overview: '',
      persons: [],
      poster_path: '',
      release_date: '',
      release_year: '',
      runtime: '0',
      tagline: '',
      title: '',
      tmdb_id: 1,
      vote_average: 1,
      writers: []
    },
    receiver: {
      email: '',
      friendOf: [],
      friends: [],
      id: '1',
      movies: [],
      password: '',
      username: '',
    },
    performer: {
      email: '',
      friendOf: [],
      friends: [],
      id: '1',
      movies: [],
      password: '',
      username: '',
    }
  },
]

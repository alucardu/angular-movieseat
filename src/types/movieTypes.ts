import { IUser } from "src/app/components/authentication/sign-up/sign-up.service"
import { IMovie, IPerson } from "src/app/mock/watchlist.json"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObjectMovie = {
  data: IMovie,
  response: IResponse,
}

type ReturnObjectMovies = {
  data: [IMovie],
  response: IResponse,
}

type ReturnObjectPerson = {
  data: IPerson,
  response: IResponse
}

type ReturnObjectPersons = {
  data: [IPerson],
  response: IResponse
}

type User = {
  data: IUser
}

// MUTATIONS
export type CreateMovie = {
  createMovies: ReturnObjectMovie
}

export type AddMovieToUser = {
  addMovieToUser: ReturnObjectMovie
}

export type RemoveMovieFromUser = {
  removeMovieFromUser: ReturnObjectMovie
}

// QUERIES
export type SearchMovies = {
  searchMovies: ReturnObjectMovies
}

export type SearchPerson = {
  searchPerson: ReturnObjectPerson
}


export type SearchPersons = {
  searchPersons: ReturnObjectPersons
}

export type GetMovie = {
  getMovie: ReturnObjectMovie
}

export type GetWatchlistUser = {
  getWatchlistUser: User
}

export type GetDiscoverMovies = {
  getDiscoverMovies: ReturnObjectMovies
}

export type GetPopularAmondFriends = {
  getPopularAmongFriends: ReturnObjectMovies
}

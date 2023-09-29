import { IMovie } from "src/app/mock/watchlist.json"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObjectMovie = {
  data: IMovie,
  response: IResponse,
}

// QUERIES
export type SearchMovies = {
  searchMovies: ReturnObjectMovie
}

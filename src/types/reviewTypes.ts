import { IMovieReview } from "src/app/components/features/movie-details/movie-reviews/movie-reviews.service"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObjectReview = {
  data: IMovieReview,
  response: IResponse,
}

type ReturnObjectReviews = {
  data: [IMovieReview],
  response: IResponse,
}

// MUTATIONS
export type AddReviewToMovie = {
  addReviewToMovie: ReturnObjectReview
}

export type EditMovieReview = {
  editMovieReview: ReturnObjectReview
}

export type RemoveReviewFromMovie = {
  removeReviewFromMovie: ReturnObjectReview
}

// QUERIES
export type GetMovieReviews = {
  getMovieReviews: ReturnObjectReviews
}

export type GetMovieReview = {
  getMovieReview: ReturnObjectReview
}

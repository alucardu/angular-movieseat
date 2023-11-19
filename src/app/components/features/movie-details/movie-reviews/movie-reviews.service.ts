import { Injectable, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUser } from 'src/app/components/authentication/sign-up/sign-up.service';
import { IMovie } from 'src/app/mock/watchlist.json';
import { ADD_REVIEW_TO_MOVIE } from 'src/operations/reviewOperations/mutations';
import { GET_MOVIE_REVIEW, GET_MOVIE_REVIEWS } from 'src/operations/reviewOperations/queries';
import { AddReviewToMovie, GetMovieReview, GetMovieReviews } from 'src/types/reviewTypes';

export interface IMovieReview {
  id: string,
  content: string,
  createdAt: Date,
  user: IUser
  movie: IMovie
}

@Injectable({
  providedIn: 'root'
})
export class MovieReviewsService {
  private apollo = inject(Apollo)

  private reviewsSubject$ = new BehaviorSubject<IMovieReview[]>([]);
  public reviews$ = this.reviewsSubject$.asObservable();

  public addReviewToMovie(reviewControl: FormControl, movieId: string): Observable<MutationResult<AddReviewToMovie>> {
    return this.apollo.mutate<AddReviewToMovie>({
      mutation: ADD_REVIEW_TO_MOVIE,
      variables: {
        content: reviewControl.value,
        movieId: movieId
      }
    })
  }

  public getMovieReviews(movieId: string): void {
    this.apollo.query<GetMovieReviews>({
      query: GET_MOVIE_REVIEWS,
      variables: {
        movieId: movieId
      },
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: ({data}) => this.reviewsSubject$.next(data.getMovieReviews.data)
    })
  }

  public getMovieReview(reviewId: string): Observable<ApolloQueryResult<GetMovieReview>> {
    return this.apollo.query<GetMovieReview>({
      query: GET_MOVIE_REVIEW,
      variables: {
        reviewId: reviewId
      }
    })
  }
}

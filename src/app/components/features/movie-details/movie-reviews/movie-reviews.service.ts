import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovieReview, movieReviews } from 'src/app/mock/movie-reviews.json';

@Injectable({
  providedIn: 'root'
})
export class MovieReviewsService {
  private reviewsSubject$ = new BehaviorSubject<IMovieReview[]>(movieReviews);
  public reviews$ = this.reviewsSubject$.asObservable();
}

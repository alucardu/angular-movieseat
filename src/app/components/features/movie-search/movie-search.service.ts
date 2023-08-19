import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IResult, searchResults } from 'src/app/mock/movie-search-results.json';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private movieSearchResultsSubject$ = new BehaviorSubject<IResult[]>(searchResults)
  public movieSearchResults$ = this.movieSearchResultsSubject$.asObservable();

  private movieSearchOpenedIndexSubject$ = new BehaviorSubject<number>(-1);
  public movieSearchOpenedIndex$ = this.movieSearchOpenedIndexSubject$.asObservable();

  public setMovieSearchOpenedIndex(index: number): void {
    this.movieSearchOpenedIndexSubject$.value === index ? this.movieSearchOpenedIndexSubject$.next(-1) : this.movieSearchOpenedIndexSubject$.next(index)
  }
}

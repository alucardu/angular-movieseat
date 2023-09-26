import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IResult, searchResults } from 'src/app/mock/movie-search-results.json';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private movieSearchQuerySubject$ = new Subject<string>
  public movieSearchQuery$ = this.movieSearchQuerySubject$.asObservable();

  private movieSearchResultsSubject$ = new BehaviorSubject<IResult[]>([])
  public movieSearchResults$ = this.movieSearchResultsSubject$.asObservable();

  private movieSearchOpenedIndexSubject$ = new BehaviorSubject<number>(-1);
  public movieSearchOpenedIndex$ = this.movieSearchOpenedIndexSubject$.asObservable();

  public setMovieSearchOpenedIndex(index: number): void {
    this.movieSearchOpenedIndexSubject$.value === index ? this.movieSearchOpenedIndexSubject$.next(-1) : this.movieSearchOpenedIndexSubject$.next(index)
  }

  public getMovieSearchResults(query: string): void {
    if (query.length > 0) {
      this.movieSearchResultsSubject$.next(searchResults)
    } else {
      this.movieSearchResultsSubject$.next([])
    }
  }
}

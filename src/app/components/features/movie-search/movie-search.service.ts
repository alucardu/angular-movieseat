import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IResult, searchResults } from 'src/app/mock/movie-search-results.json';
import { Apollo } from 'apollo-angular';
import { SearchMovies } from 'src/types/movieTypes';
import { SEARCH_MOVIES } from 'src/operations/userOperations/queries';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private apollo = inject(Apollo)


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
      this.apollo.query<SearchMovies>({
        query: SEARCH_MOVIES,
        variables: {
          query: query
        }
      }).subscribe({
        next: (data) => console.log(data)
      })
      this.movieSearchResultsSubject$.next(searchResults)

    } else {
      this.movieSearchResultsSubject$.next([])
    }
  }
}

import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Apollo, MutationResult } from 'apollo-angular';
import { CreateMovie, SearchMovies } from 'src/types/movieTypes';
import { SEARCH_MOVIES } from 'src/operations/userOperations/queries';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { IMovie } from 'src/app/mock/watchlist.json';
import { CREATE_MOVIE } from 'src/operations/userOperations/mutations';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private apollo = inject(Apollo)


  private movieSearchQuerySubject$ = new Subject<string>
  public movieSearchQuery$ = this.movieSearchQuerySubject$.asObservable();

  private movieSearchResultsSubject$ = new BehaviorSubject<IMovie[]>([])
  public movieSearchResults$ = this.movieSearchResultsSubject$.asObservable();

  private movieSearchOpenedIndexSubject$ = new BehaviorSubject<number>(-1);
  public movieSearchOpenedIndex$ = this.movieSearchOpenedIndexSubject$.asObservable();

  public setMovieSearchOpenedIndex(index: number): void {
    this.movieSearchOpenedIndexSubject$.value === index ? this.movieSearchOpenedIndexSubject$.next(-1) : this.movieSearchOpenedIndexSubject$.next(index)
  }

  public getMovieSearchResults(query: string): Observable<ApolloQueryResult<SearchMovies>> | null {
    if (query.length > 0) {
      return this.apollo.query<SearchMovies>({
        query: SEARCH_MOVIES,
        variables: {
          query: query
        }
      })
    } else {
      return null
    }
  }

  public setMovieSearchResults(movies: Array<IMovie>): void {
    this.movieSearchResultsSubject$.next(movies)
  }

  public createMovie(movie: IMovie): Observable<MutationResult<CreateMovie>> {
    return this.apollo.mutate<CreateMovie>({
      mutation: CREATE_MOVIE,
      variables: {
        movie: movie
      }
    })
  }
}

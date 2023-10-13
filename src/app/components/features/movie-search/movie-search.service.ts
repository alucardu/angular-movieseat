import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Apollo, MutationResult } from 'apollo-angular';
import { CreateMovie, GetDiscoverMovies, GetPopularAmondFriends, SearchMovies } from 'src/types/movieTypes';
import { DISCOVER_MOVIES, POPULAR_AMONG_FRIENDS, SEARCH_MOVIES } from 'src/operations/userOperations/queries';
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

  private movieDiscoverPlayingNowSubject$ = new BehaviorSubject<IMovie[]>([])
  public movieDiscoverPlaying$ = this.movieDiscoverPlayingNowSubject$.asObservable();

  private movieDiscoverUpcomingNowSubject$ = new BehaviorSubject<IMovie[]>([])
  public movieDiscoverUpcoming$ = this.movieDiscoverUpcomingNowSubject$.asObservable();

  private moviePopularAmongFriendsSubject$ = new BehaviorSubject<IMovie[]>([])
  public moviePopularAmongFriends$ = this.moviePopularAmongFriendsSubject$.asObservable();

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

  public getPopularAmongFriends(): void {
    this.apollo.query<GetPopularAmondFriends>({
      query: POPULAR_AMONG_FRIENDS,
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: ({data}) => this.moviePopularAmongFriendsSubject$.next(data.getPopularAmongFriends.data),
      error: (data) => console.log(data),
    })
  }

  public getDiscoveredMovies(type: string): void {
    this.apollo.query<GetDiscoverMovies>({
      query: DISCOVER_MOVIES,
      variables: {
        type: type
      }
    }).subscribe({
      next: ({data}) => {
        if (type === 'theatre') {
          this.movieDiscoverPlayingNowSubject$.next(data.getDiscoverMovies.data)
        }

        if (type === 'upcoming') {
          this.movieDiscoverUpcomingNowSubject$.next(data.getDiscoverMovies.data)
        }
      },
      error: (error) => console.log(error)
    })
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

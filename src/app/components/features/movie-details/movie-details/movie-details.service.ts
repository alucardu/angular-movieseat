import { Injectable, inject } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IMovie } from 'src/app/mock/watchlist.json';
import { GET_WATCHLIST_USER } from 'src/operations/userOperations/queries';
import { AddMovieToUser, GetMovie, GetWatchlistUser, RemoveMovieFromUser } from 'src/types/movieTypes';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { IUser } from 'src/app/components/authentication/sign-up/sign-up.service';
import { AuthService } from 'src/app/components/authentication/auth.service';
import { GET_MOVIE } from 'src/operations/movieOperations/queries';
import { REMOVE_MOVIE_FROM_USER, ADD_MOVIE_TO_USER } from 'src/operations/movieOperations/mutations';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private apollo = inject(Apollo)
  private authService = inject(AuthService)

  private movieSubject$ = new Subject<IMovie>;
  public movie$ = this.movieSubject$.asObservable();

  private movieWatchlistUserSubject$ = new Subject<IUser>()
  public movieWatchlistUser$ = this.movieWatchlistUserSubject$.asObservable();

  private movieWatchlistSubject$ = new BehaviorSubject<IMovie[]>([])
  public movieWatchlist$ = this.movieWatchlistSubject$.asObservable();

  private userHasAddedMovieSubject$ = new BehaviorSubject<boolean>(false)
  public userHasAddedMovie$ = this.userHasAddedMovieSubject$.asObservable();

  public setMovie(movie: IMovie): void {
    this.movieSubject$.next(movie);
  }

  public test(tmdb_id: number): Observable<ApolloQueryResult<GetMovie>> {
    return this.apollo.query<GetMovie>({
      query: GET_MOVIE,
      variables: {
        tmdb_id: tmdb_id
      }
    })
  }

  public removeMovieFromWatchlist(movie: IMovie): Observable<MutationResult<RemoveMovieFromUser>> {
    return this.apollo.mutate<RemoveMovieFromUser>({
      mutation: REMOVE_MOVIE_FROM_USER,
      variables: {
        movie: movie
      }
    })
  }

  public addMovieToWatchlist(movie: IMovie): Observable<MutationResult<AddMovieToUser>> {
    return this.apollo.mutate<AddMovieToUser>({
      mutation: ADD_MOVIE_TO_USER,
      variables: {
        movie: movie
      }
    })
  }

  public updateWatchlistUser(movie: IMovie, action: string): void {
    if (action === 'add') {
      this.movieWatchlistSubject$.next([...this.authService.getCurrentUser().movies, movie])
      const currentUser = this.authService.getCurrentUser()
      currentUser.movies = [...this.movieWatchlistSubject$.value, movie]
      this.authService.updateCurrentUser(currentUser)
    }
    if (action === 'remove') {
      const updatedWatchlist = this.authService.getCurrentUser().movies.filter((watchlistMovie) => watchlistMovie.tmdb_id !== movie.tmdb_id)
      this.movieWatchlistSubject$.next(updatedWatchlist)
      const currentUser = this.authService.getCurrentUser()
      currentUser.movies = updatedWatchlist
      this.authService.updateCurrentUser(currentUser)
    }

    this.userHasAddedMovieSubject$.next(this.authService.getCurrentUser().movies.some((watchlistMovie) => watchlistMovie.tmdb_id === movie.tmdb_id || watchlistMovie.tmdb_id === movie.id))
  }

  public getWatchlistUser(userId: number, type?: string): void {
    this.apollo.query<GetWatchlistUser>({
      query: GET_WATCHLIST_USER,
      variables: {
        id: userId,
        type: type
      },
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: ({data}) => {
        this.movieWatchlistSubject$.next(data.getWatchlistUser.data?.movies);
        this.movieWatchlistUserSubject$.next(data.getWatchlistUser?.data);
      },
      error: (error) => console.log(error)
    })
  }

  public getMovie(tmdb_id: number): void {
    this.apollo.query<GetMovie>({
      query: GET_MOVIE,
      variables: {
        tmdb_id: tmdb_id
      }
    }).subscribe({
      next: ({data}) => this.setMovie(data.getMovie.data)
    })
  }

  public userHasAddedMovie(movie: IMovie): void {
    this.userHasAddedMovieSubject$.next(this.authService.getCurrentUser()?.movies.some((watchlistMovie) => watchlistMovie.tmdb_id === movie.tmdb_id || watchlistMovie.tmdb_id === movie.id))
  }
}

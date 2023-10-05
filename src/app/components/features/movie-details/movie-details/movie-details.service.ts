import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { IMovie, watchlist } from 'src/app/mock/watchlist.json';
import { GET_MOVIE } from 'src/operations/userOperations/queries';
import { GetMovie } from 'src/types/movieTypes';
import { ApolloQueryResult } from '@apollo/client/core/types';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private apollo = inject(Apollo)
  private movies$ = watchlist;

  private movieSubject$ = new Subject<IMovie>;
  public movie$ = this.movieSubject$.asObservable();

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
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMovie, watchlist } from 'src/app/mock/watchlist.json';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private movies$ = watchlist;

  private movieSubject$ = new Subject<IMovie>;
  public movie$ = this.movieSubject$.asObservable();

  public setMovie(id: number): void {
    const movie = this.movies$.find((movie) => movie.id === id)!
    this.movieSubject$.next(movie);
  }
}

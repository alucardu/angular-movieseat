import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { IMovie, IPerson } from 'src/app/mock/watchlist.json';
import { ReplaceSpaces, StripTitle } from 'src/app/utils/string-utils';
import { MovieDetailsService } from '../../movie-details/movie-details/movie-details.service';
import { MovieSearchService } from '../movie-search.service';
import { toggleContent } from 'src/app/animations';

@Component({
  selector: 'app-movie-person-result',
  templateUrl: './movie-person-result.component.html',
  styleUrls: ['./movie-person-result.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  animations: [toggleContent],
})
export class MoviePersonResultComponent {
  private router = inject(Router)
  private movieDetailService = inject(MovieDetailsService)
  private movieSearchService = inject(MovieSearchService)

  @Input() public searchResult!: IPerson
  @Input() public index!: number

  public moviePersonOpenedIndex$ = this.movieSearchService.moviePersonOpenedIndex$

  public navigateToMovie(movie: IMovie): void {
    this.movieDetailService.test(movie.id).pipe(first()).subscribe({
      next: () => this.router.navigate([`/movie/${movie.id}/${ReplaceSpaces(movie.title)}`]),
      error: () => this.createMovie(movie)
    })
  }

  public createMovie(movie: IMovie): void {
    this.movieSearchService.createMovie(movie).subscribe({
      next: () => this.router.navigate([`/movie/${movie.id}/${ReplaceSpaces(movie.title)}`]),
      error: (error) => console.log(error)
    })
  }

  public stripTitle(title: string): string {
    return StripTitle(title)
  }

  public toggleOpened(index: number): void {
    this.movieSearchService.setMoviePersonOpenedIndex(index)
  }
}

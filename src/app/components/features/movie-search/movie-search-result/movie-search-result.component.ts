import { Component, Input, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RatingCircleComponent } from 'src/app/components/UI/rating-circle/rating-circle.component';
import { CommonModule } from '@angular/common';
import { toggleContent } from 'src/app/animations';
import { MovieSearchService } from '../movie-search.service';
import { Router, RouterLink } from '@angular/router';
import { IMovie } from 'src/app/mock/watchlist.json';
import { MovieDetailsService } from '../../movie-details/movie-details/movie-details.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie-search-result',
  templateUrl: './movie-search-result.component.html',
  styleUrls: ['./movie-search-result.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RatingCircleComponent, RouterLink],
  animations: [toggleContent],
})
export class MovieSearchResultComponent {
  private movieSearchService = inject(MovieSearchService)
  private movieDetailService = inject(MovieDetailsService)
  private router = inject(Router)

  @Input() public searchResult!: IMovie
  @Input() public index!: number

  public movieSearchOpenedIndex$ = this.movieSearchService.movieSearchOpenedIndex$

  public toggleOpened(index: number): void {
    this.movieSearchService.setMovieSearchOpenedIndex(index)
  }

  public backDropIsAvailable(backdropPath: string): boolean {
    return backdropPath ? true : false
  }

  public navigateToMovie(movie: IMovie): void {
    this.movieDetailService.test(movie.id).pipe(first()).subscribe({
      next: () => this.router.navigate([`/movie/${movie.id}/${this.replaceSpaces(movie.title)}`]),
      error: () => this.createMovie(movie)
    })
  }

  private replaceSpaces(title: string): string {
    return title.replace(/\s/g, '-')
  }

  public createMovie(movie: IMovie): void {
    console.log(movie)
    this.movieSearchService.createMovie(movie).subscribe({
      next: () => this.router.navigate([`/movie/${movie.id}/${this.replaceSpaces(movie.title)}`]),
      error: (error) => console.log(error)
    })
  }
}

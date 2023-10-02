import { Component, Input, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RatingCircleComponent } from 'src/app/components/UI/rating-circle/rating-circle.component';
import { CommonModule } from '@angular/common';
import { toggleContent } from 'src/app/animations';
import { MovieSearchService } from '../movie-search.service';
import { RouterLink } from '@angular/router';
import { IMovie } from 'src/app/mock/watchlist.json';

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

  @Input() public searchResult!: IMovie
  @Input() public index!: number

  public movieSearchOpenedIndex$ = this.movieSearchService.movieSearchOpenedIndex$

  public toggleOpened(index: number): void {
    this.movieSearchService.setMovieSearchOpenedIndex(index)
  }

  public backDropIsAvailable(backdropPath: string): boolean {
    return backdropPath ? true : false
  }

  public createMovie(movie: IMovie): void {
    this.movieSearchService.createMovie(movie).subscribe({
      next: (data) => console.log(data)
    })
  }
}

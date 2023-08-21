import { Component, Input, inject } from '@angular/core';
import { IResult } from '../../../../mock/movie-search-results.json';
import { MaterialModule } from 'src/app/material.module';
import { RatingCircleComponent } from 'src/app/components/UI/rating-circle/rating-circle.component';
import { CommonModule } from '@angular/common';
import { toggleContent } from 'src/app/animations';
import { MovieSearchService } from '../movie-search.service';
import { RouterLink } from '@angular/router';

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

  @Input() public searchResult!: IResult
  @Input() public index!: number

  public movieSearchOpenedIndex$ = this.movieSearchService.movieSearchOpenedIndex$

  public toggleOpened(index: number): void {
    this.movieSearchService.setMovieSearchOpenedIndex(index)
  }
}

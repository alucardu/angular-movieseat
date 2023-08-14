import { Component } from '@angular/core';
import { searchResults } from '../../../../mock/movie-search-results.json';
import { MaterialModule } from 'src/app/material.module';
import { RatingCircleComponent } from 'src/app/components/UI/rating-circle/rating-circle.component';
import { CommonModule } from '@angular/common';
import { toggleSearchResult } from 'src/app/animations';

@Component({
  selector: 'app-movie-search-result',
  templateUrl: './movie-search-result.component.html',
  styleUrls: ['./movie-search-result.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RatingCircleComponent],
  animations: [toggleSearchResult],
})
export class MovieSearchResultComponent {
  public searchResults = searchResults;
  public openedIndex!: number | null;
  public animating = true

  public toggleOpened(index: number): void {
    this.openedIndex = (this.openedIndex === index ? null : index)
  }
}

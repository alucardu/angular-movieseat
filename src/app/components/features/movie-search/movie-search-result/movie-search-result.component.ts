import { Component } from '@angular/core';
import { searchResults } from '../../../../mock/movie-search-results.json';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MaterialModule } from 'src/app/material.module';
import { RatingCircleComponent } from 'src/app/components/UI/rating-circle/rating-circle.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-search-result',
  templateUrl: './movie-search-result.component.html',
  styleUrls: ['./movie-search-result.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RatingCircleComponent],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed, void => collapsed, void => expanded',
        animate('225ms ease-in-out')
      ),
    ]),
  ],
})
export class MovieSearchResultComponent {
  public searchResults = searchResults;
  public openedIndex!: number | null;

  public toggleOpened(index: number): void {
    this.openedIndex = (this.openedIndex === index ? null : index)
  }
}

import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MovieSearchResultComponent } from './movie-search-result/movie-search-result.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieSearchService } from './movie-search.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, MovieSearchResultComponent]
})
export class MovieSearchComponent {
  private movieSearchService = inject(MovieSearchService)

  public showSearch = false;
  public movieSearchResults$ = this.movieSearchService.movieSearchResults$
}

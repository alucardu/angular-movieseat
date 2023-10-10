import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MovieSearchResultComponent } from './movie-search-result/movie-search-result.component';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MovieSearchService } from './movie-search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MovieSearchSuggestionComponent } from './movie-search-suggestion/movie-search-suggestion.component';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
  standalone: true,
  animations: [fadeAnimation],
  imports: [CommonModule, RouterModule, MaterialModule, MovieSearchResultComponent, MovieSearchSuggestionComponent]
})
export class MovieSearchComponent {
  private movieSearchService = inject(MovieSearchService)
  private router = inject(Router)

  public noResults = false;
  public showSearch = false;
  public movieSearchResults$ = this.movieSearchService.movieSearchResults$
  public searchQuery = new FormControl('', { nonNullable: true })

  public constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.movieSearchService.setMovieSearchResults([])
        this.movieSearchService.setMovieSearchOpenedIndex(-1)
      }
    });

    this.searchQuery.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe({
      next: (query) => {
        if (query.trim().length === 0) {
          this.searchQuery.markAsPristine()
          this.movieSearchService.setMovieSearchResults([])
          this.noResults = false;
          return;
        }

        this.movieSearchService.getMovieSearchResults(query)?.subscribe({
          next: (movies) => {
            if (movies.data.searchMovies.response.code === 'M_01') {
              this.noResults = false;
              this.movieSearchService.setMovieSearchResults(movies.data.searchMovies.data)
            } else {
              this.noResults = true;
              this.movieSearchService.setMovieSearchResults([])
            }
          },
          error: (error) => console.log(error)
        })
      }
    })
  }

  public resetSearchQuery(): void {
    this.searchQuery.reset();
  }
}

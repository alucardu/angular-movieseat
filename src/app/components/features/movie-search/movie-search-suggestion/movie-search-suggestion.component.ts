import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fadeToggle } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { MovieSearchService } from '../movie-search.service';
import { StripTitle, ReplaceSpaces } from 'src/app/utils/string-utils';
import { IMovie } from 'src/app/mock/watchlist.json';
import { MovieDetailsService } from '../../movie-details/movie-details/movie-details.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie-search-suggestion',
  templateUrl: './movie-search-suggestion.component.html',
  styleUrls: ['./movie-search-suggestion.component.scss'],
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  animations: [fadeToggle]
})
export class MovieSearchSuggestionComponent implements OnInit {
  private movieSearchService = inject(MovieSearchService)
  private movieDetailService = inject(MovieDetailsService)
  private router = inject(Router)

  @Input() public type!: string;

  @ViewChild('comingSoon') private comingSoon!: ElementRef<HTMLElement>
  @ViewChild('playingNow') private playingNow!: ElementRef<HTMLElement>

  public movieDiscoverPlaying$ = this.movieSearchService.movieDiscoverPlaying$
  public movieDiscoverUpcoming$ = this.movieSearchService.movieDiscoverUpcoming$
  public moviePopularAmongFriends$ = this.movieSearchService.moviePopularAmongFriends$

  public selectedType = 'comingSoon';
  public colorType = 'comingSoon';

  public ngOnInit(): void {
    this.getDiscoverMovies('theatre');
    this.getDiscoverMovies('upcoming');
    this.getPopularAmongFriends()
  }

  private getDiscoverMovies(type: string): void {
    this.movieSearchService.getDiscoveredMovies(type);
  }

  private getPopularAmongFriends(): void {
    this.movieSearchService.getPopularAmongFriends();
  }

  public toggleSelection(type: string): void {
    if (this.selectedType === type) {
      this.selectedType = this.selectedType === 'comingSoon' ? 'playingNow' : 'comingSoon'
      this.colorType = this.colorType === 'comingSoon' ? 'playingNow' : 'comingSoon'
      return;
    }

    this.selectedType = type;
    this.colorType = type;
  }

  public resetScrollPosition(): void {
    this.comingSoon.nativeElement.scrollLeft = 0
    this.playingNow.nativeElement.scrollLeft = 0
  }

  public returnSelectedState(type: string): string {
    return this.selectedType === type ? 'in' : 'out'
  }

  public navigateToMovie(movie: IMovie, from?: string): void {
    const movieId = from === 'popularAmongFriends' ? movie.tmdb_id : movie.id
    this.movieDetailService.test(movieId).pipe(first()).subscribe({
      next: () => this.router.navigate([`/movie/${movieId}/${ReplaceSpaces(movie.title)}`]),
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
}

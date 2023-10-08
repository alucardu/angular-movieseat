import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';
import { MovieDetailsService } from '../movie-details/movie-details/movie-details.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MovieDisplayComponent]
})
export class WatchlistComponent implements OnInit {
  private metaTitleService = inject(Title)
  private movieDetailService = inject(MovieDetailsService)

  public movieWatchlist$ = this.movieDetailService.movieWatchlist$

  public ngOnInit(): void {
    this.metaTitleService.setTitle('Movieseat Watchlist')
    this.movieDetailService.getWatchlistUser();
  }
}

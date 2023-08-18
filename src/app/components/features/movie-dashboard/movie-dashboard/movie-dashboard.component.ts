import { Component } from '@angular/core';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MovieSearchComponent } from '../../movie-search/movie-search.component';
import { WatchlistComponent } from '../../watchlist/watchlist.component';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, MovieDisplayComponent, MovieSearchComponent, WatchlistComponent, RouterModule],
})
export class MovieDashboardComponent {

}

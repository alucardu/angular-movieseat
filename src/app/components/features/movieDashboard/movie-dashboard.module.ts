import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieDashboardRoutes } from './movie-dashboard.routing';
import { MovieDetailsComponent } from '../movieDetails/movie-details/movie-details.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';

@NgModule({
  declarations: [MovieDashboardComponent, MovieDetailsComponent],
  imports: [BrowserModule, MovieDashboardRoutes, YoutubePlayerComponent],
})
export class MovieDashboardModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieDashboardRoutes } from './movie-dashboard.routing';
import { MovieDetailsComponent } from '../movieDetails/movie-details/movie-details.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';
import { MaterialModule } from 'src/app/material.module';
import { ClipsContainerComponent } from '../movieDetails/clips-container/clips-container.component';

@NgModule({
  declarations: [
    MovieDashboardComponent,
    MovieDetailsComponent,
    MovieDisplayComponent,
    ClipsContainerComponent,
  ],
  imports: [
    BrowserModule,
    MovieDashboardRoutes,
    YoutubePlayerComponent,
    MaterialModule
  ],
})
export class MovieDashboardModule {}

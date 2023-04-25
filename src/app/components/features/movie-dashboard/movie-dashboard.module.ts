import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieDashboardRoutes } from './movie-dashboard.routing';
import { MovieDetailsComponent } from '../movie-details/movie-details/movie-details.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';
import { MaterialModule } from 'src/app/material.module';
import { ClipsContainerComponent } from '../movie-details/clips-container/clips-container.component';
import { ImageSliderComponent } from '../movie-details/image-slider/image-slider.component';
import { MovieReviewsComponent } from '../movie-details/movie-reviews/movie-reviews.component';
import { MovieReviewComponent } from '../movie-details/movie-reviews/movie-review/movie-review.component';

@NgModule({
  declarations: [
    MovieDashboardComponent,
    MovieDetailsComponent,
    MovieDisplayComponent,
    ClipsContainerComponent,
    MovieReviewsComponent,
    MovieReviewComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    MovieDashboardRoutes,
    YoutubePlayerComponent,
    MaterialModule
  ],
})
export class MovieDashboardModule {}

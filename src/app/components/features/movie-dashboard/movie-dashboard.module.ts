import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieDashboardRoutes } from './movie-dashboard.routing';
import { MovieDetailsComponent } from '../movie-details/movie-details/movie-details.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MaterialModule } from 'src/app/material.module';
import { ClipsContainerComponent } from '../movie-details/clips-container/clips-container.component';
import { ImageSliderComponent } from '../movie-details/image-slider/image-slider.component';
import { MovieReviewsComponent } from '../movie-details/movie-reviews/movie-reviews.component';
import { CreateReviewDialogComponent, FullReviewDialogComponent, MovieReviewComponent } from '../movie-details/movie-reviews/movie-review/movie-review.component';
import { MovieRatingComponent } from '../movie-details/movie-rating/movie-rating.component';
import { SpeedDialFabComponent } from '../../UI/speed-dial-fab/speed-dial-fab.component';

@NgModule({
  declarations: [
    MovieDashboardComponent,
    MovieDetailsComponent,
    MovieDisplayComponent,
    ClipsContainerComponent,
    MovieReviewsComponent,
    MovieReviewComponent,
    ImageSliderComponent,
    MovieRatingComponent,
    SpeedDialFabComponent,
    FullReviewDialogComponent,
    CreateReviewDialogComponent
  ],
  imports: [
    BrowserModule,
    MovieDashboardRoutes,
    YoutubePlayerComponent,
    MaterialModule
  ],
})
export class MovieDashboardModule {}

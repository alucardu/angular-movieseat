import { Component } from '@angular/core';
import { IMovie } from '../../movie-dashboard/movie-display/movie-display.component';
import { MaterialModule } from 'src/app/material.module';
import { YoutubePlayerComponent } from 'src/app/components/shared/youtube-player/youtube-player.component';
import { ShareSocialComponent } from 'src/app/components/shared/share-social/share-social.component';
import { ClipsContainerComponent } from '../../../UI/clips-container/clips-container.component';
import { MovieReviewsComponent } from '../movie-reviews/movie-reviews.component';
import { MovieRatingComponent } from '../rating-stars/movie-rating.component';
import { ImageSliderComponent } from 'src/app/components/UI/image-slider/image-slider.component';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [MaterialModule, YoutubePlayerComponent, ShareSocialComponent, MovieRatingComponent, ImageSliderComponent, ClipsContainerComponent, MovieReviewsComponent, RouterModule]
})
export class MovieDetailsComponent {
  public movie: IMovie = {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "29-10-1986"
  }
}

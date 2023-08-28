import { Component, OnInit, inject } from '@angular/core';
import { IMovie } from '../../movie-dashboard/movie-display/movie-display.component';
import { MaterialModule } from 'src/app/material.module';
import { YoutubePlayerComponent } from 'src/app/components/shared/youtube-player/youtube-player.component';
import { ShareSocialComponent } from 'src/app/components/shared/share-social/share-social.component';
import { ClipsContainerComponent } from '../../../UI/clips-container/clips-container.component';
import { MovieReviewsComponent } from '../movie-reviews/movie-reviews.component';
import { MovieRatingComponent } from '../rating-stars/movie-rating.component';
import { ImageSliderComponent } from 'src/app/components/UI/image-slider/image-slider.component';
import { RouterModule } from '@angular/router';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, YoutubePlayerComponent, ShareSocialComponent, MovieRatingComponent, ImageSliderComponent, ClipsContainerComponent, MovieReviewsComponent, RouterModule]
})
export class MovieDetailsComponent implements OnInit {
  private snackBarService = inject(SnackbBarService)
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public movieIsAdded = false;
  public watchedMovie = false;

  public ngOnInit(): void {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Angular SEO Integration, Music CRUD, Angular Universal',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);

    this.metaTitleService.setTitle('Movie title goes here')
  }

  public movie: IMovie = {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "29-10-1986"
  }

  public addMovie(): void {
    this.movieIsAdded = !this.movieIsAdded
    this.snackBarService.openSnackBar('Moonrise Kingdom has been added to your watchlist!', SnackBarState.SUCCESS);
  }

  public removeMovie(): void {
    this.movieIsAdded = !this.movieIsAdded
    this.snackBarService.openSnackBar('Moonrise Kingdom has been removed to your watchlist!', SnackBarState.SUCCESS);
  }

  public toggleWatchedState(): void {
    let message!: string;

    this.watchedMovie = !this.watchedMovie

    if (this.watchedMovie) {
      message = 'Moonrise Kingdome has been marked as watched'
    } else {
      message = 'Moonrise Kingdome has been marked as unwatched'
    }

    this.snackBarService.openSnackBar(message, SnackBarState.SUCCESS);
  }
}

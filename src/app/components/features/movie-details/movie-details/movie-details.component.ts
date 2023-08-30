import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClipsContainerComponent } from 'src/app/components/UI/clips-container/clips-container.component';
import { ImageSliderComponent } from 'src/app/components/UI/image-slider/image-slider.component';
import { ShareSocialComponent } from 'src/app/components/shared/share-social/share-social.component';
import { YoutubePlayerComponent } from 'src/app/components/shared/youtube-player/youtube-player.component';
import { MaterialModule } from 'src/app/material.module';
import { MovieReviewsComponent } from '../movie-reviews/movie-reviews.component';
import { MovieRatingComponent } from '../rating-stars/movie-rating.component';
import { SnackbBarService, SnackBarState } from 'src/app/services/snackbBar.service';
import { IMovie } from '../../movie-dashboard/movie-display/movie-display.component';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, YoutubePlayerComponent, ShareSocialComponent, MovieRatingComponent, ImageSliderComponent, ClipsContainerComponent, MovieReviewsComponent, RouterModule]
})

export class MovieDetailsComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    this.metaTitleService.setTitle('Moonrise kingdom') // for sharing popup on device

    this.metaTagService.updateTag({ name: 'keywords', content: 'Moonrise Kingdom keywords'})
    this.metaTagService.updateTag({ property: 'og:type', content: 'Movie' })
    this.metaTagService.updateTag({ property: 'og:url', content: 'https://moviese.at/movies/moonrise-kingdom' })
    this.metaTagService.updateTag({ property: 'og:image', content: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg' })
    this.metaTagService.updateTag({ property: 'og:title', content: 'Moonrise Kingdom' })
    this.metaTagService.updateTag({ property: 'og:description', content: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.' })
  }

  private snackBarService = inject(SnackbBarService)

  public movieIsAdded = false;
  public watchedMovie = false;

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

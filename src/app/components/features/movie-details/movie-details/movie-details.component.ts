import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClipsContainerComponent } from 'src/app/components/UI/clips-container/clips-container.component';
import { ImageSliderComponent } from 'src/app/components/UI/image-slider/image-slider.component';
import { ShareSocialComponent } from 'src/app/components/shared/share-social/share-social.component';
import { YoutubePlayerComponent } from 'src/app/components/shared/youtube-player/youtube-player.component';
import { MaterialModule } from 'src/app/material.module';
import { MovieReviewsComponent } from '../movie-reviews/movie-reviews.component';
import { MovieRatingComponent } from '../rating-stars/movie-rating.component';
import { SnackbBarService } from 'src/app/services/snackbBar.service';
import { first } from 'rxjs';
import { MovieDetailsService } from './movie-details.service';
import { IMovie, IPerson } from 'src/app/mock/watchlist.json';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, YoutubePlayerComponent, ShareSocialComponent, MovieRatingComponent, ImageSliderComponent, ClipsContainerComponent, MovieReviewsComponent, RouterModule]
})

export class MovieDetailsComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)
  private route = inject(ActivatedRoute)
  private movieService = inject(MovieDetailsService)

  public movie$ = this.movieService.movie$;

  public ngOnInit(): void {
    this.route.paramMap.pipe(first()).subscribe({
      next: (data) => {
        const id = Number(data.get('id'))
        this.movieService.getMovie(id)
      }
    })

    this.movie$.pipe(first()).subscribe({
      next: (movie) => {
        this.metaTitleService.setTitle(movie.title) // for sharing popup on device

        this.metaTagService.updateTag({ property: 'og:type', content: 'Movie' })
        this.metaTagService.updateTag({ property: 'og:image', content: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` })
        this.metaTagService.updateTag({ property: 'og:title', content: movie.title })
        this.metaTagService.updateTag({ property: 'og:description', content: movie.overview })
      }
    })
  }

  private snackBarService = inject(SnackbBarService)

  public movieIsAdded = false;
  public watchedMovie = false;
  public movie!: IMovie;

  public addMovie(): void {
    this.movieIsAdded = !this.movieIsAdded
    // this.snackBarService.openSnackBar('Moonrise Kingdom has been added to your watchlist!', SnackBarState.SUCCESS);
  }

  public removeMovie(): void {
    this.movieIsAdded = !this.movieIsAdded
    // this.snackBarService.openSnackBar('Moonrise Kingdom has been removed to your watchlist!', SnackBarState.SUCCESS);
  }

  public toggleWatchedState(): void {
    // let message!: string;

    this.watchedMovie = !this.watchedMovie

    // if (this.watchedMovie) {
    //   message = 'Moonrise Kingdome has been marked as watched'
    // } else {
    //   message = 'Moonrise Kingdome has been marked as unwatched'
    // }

    // this.snackBarService.openSnackBar(message, SnackBarState.SUCCESS);
  }

  public findPerson(persons: IPerson[], job: string): string | undefined {
    const x = persons.find((person) => person.job === job)
    return x?.person.name
  }

  public getMovieRuntime(runtime: string | number): string | number {
    switch (runtime) {
      case 0:
        return 'not available'

      default:
        return runtime
    }
  }
}

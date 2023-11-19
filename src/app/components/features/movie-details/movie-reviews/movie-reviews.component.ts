import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpeedDialFabComponent } from 'src/app/components/UI/speed-dial-fab/speed-dial-fab.component';
import { MaterialModule } from 'src/app/material.module';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { CommonModule } from '@angular/common';
import { MovieReviewsService } from './movie-reviews.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { take } from 'rxjs';


@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, SpeedDialFabComponent, MovieReviewComponent, RouterModule]
})
export class MovieReviewsComponent implements AfterViewInit {
  private movieReviewsService = inject(MovieReviewsService)
  private route = inject(ActivatedRoute)

  @ViewChild('reviewsContainer', {static: false}) private reviewsContainer!: ElementRef<HTMLElement>

  public reviewSorting = new FormControl('oldest');

  private movieId!: string | null;
  private reviewContainerWidth = 0;
  private isScrollingTimeout = setTimeout(() => {
    //
  }, 0);

  public currentReview = 1;
  public movieReviews$ = this.movieReviewsService.reviews$;

  public ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe({
      next: (data) => {
        this.movieId = data.get('id')
      }
    })

    this.movieReviewsService.getMovieReviews(this.movieId!);
  }

  public ngAfterViewInit(): void {
    this.setPosition();
  }

  private setPosition(): void {
    this.reviewContainerWidth = this.reviewsContainer.nativeElement.offsetWidth + 8
    this.reviewsContainer.nativeElement.addEventListener('scroll', () => {
      window.clearTimeout( this.isScrollingTimeout );

      this.isScrollingTimeout = setTimeout(() => {
        this.scollElement();
      }, 66)
    })
  }

  private scollElement(index?: number): void {
    const scrollLeftPosition = this.reviewsContainer.nativeElement.scrollLeft;
    const clipsScrolled = index ?? Math.round(scrollLeftPosition / this.reviewContainerWidth)

    this.currentReview = clipsScrolled + 1;

    this.reviewsContainer.nativeElement.scrollTo({left: this.reviewContainerWidth * clipsScrolled, behavior: 'smooth'})
  }
}

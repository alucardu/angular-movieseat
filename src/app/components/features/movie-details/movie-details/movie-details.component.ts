import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IMovie } from '../../movie-dashboard/movie-display/movie-display.component';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @ViewChild('youtubeContainer', { static: true}) private youtubeContainer!: ElementRef<HTMLElement>
  private apiLoaded = false;
  public movie: IMovie = {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "29-10-1986"
  }

  public ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      this.youtubeContainer.nativeElement.appendChild(tag)
      this.apiLoaded = true;
    }
  }
}

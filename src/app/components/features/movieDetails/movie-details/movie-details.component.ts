import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @ViewChild('youtubeContainer', { static: true}) private youtubeContainer!: ElementRef<HTMLElement>
  private apiLoaded = false;

  public ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      this.youtubeContainer.nativeElement.appendChild(tag)
      this.apiLoaded = true;
    }
  }
}

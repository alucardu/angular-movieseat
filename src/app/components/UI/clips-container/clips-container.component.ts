import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { YoutubePlayerComponent } from 'src/app/components/shared/youtube-player/youtube-player.component';
import { MovieDetailsServiceService } from '../../features/movie-details/movie-details.service';
import { CommonModule } from '@angular/common';
import { ClipComponent } from './clip/clip.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clips-container',
  templateUrl: './clips-container.component.html',
  styleUrls: ['./clips-container.component.scss'],
  standalone: true,
  imports: [CommonModule, YoutubePlayerComponent, ClipComponent, RouterModule]
})
export class ClipsContainerComponent implements AfterViewInit, AfterViewChecked {
  private movieDetailsService = inject(MovieDetailsServiceService)

  @ViewChild('clipsContainer', {static: false}) private clipsContainer!: ElementRef<HTMLElement>

  private apiLoaded = false;
  private youtubePlayerWidth = 0;
  private isScrollingTimeout = setTimeout(() => {
    //
  }, 0);

  public clips$ = this.movieDetailsService.clips$
  public currentClip = 0;

  public ngAfterViewInit(): void {
    this.setPosition();
  }

  public ngAfterViewChecked(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      this.clipsContainer.nativeElement.appendChild(tag)
      this.apiLoaded = true;
    }

    this.youtubePlayerWidth = this.clipsContainer.nativeElement.children[0]?.clientWidth + 8;
  }

  public scollToClip(index: number): void {
    this.scollElement(index)
  }

  private setPosition(): void {
    this.clipsContainer.nativeElement.addEventListener('scroll', () => {
      window.clearTimeout( this.isScrollingTimeout );

      this.isScrollingTimeout = setTimeout(() => {
        this.scollElement();
      }, 66)
    })
  }

  private scollElement(index?: number): void {
    const scrollLeftPosition = this.clipsContainer.nativeElement.scrollLeft;
    const clipsScrolled = index ?? Math.round(scrollLeftPosition / this.youtubePlayerWidth)

    this.currentClip = clipsScrolled;

    this.clipsContainer.nativeElement.scrollTo({left: this.youtubePlayerWidth * clipsScrolled, behavior: 'smooth'})
  }
}

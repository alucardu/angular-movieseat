import { AfterViewChecked, Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-clips-container',
  templateUrl: './clips-container.component.html',
  styleUrls: ['./clips-container.component.scss']
})
export class ClipsContainerComponent implements AfterViewChecked {
  private youtubePlayerWidth = 0;
  private width = window.screen.width / 2;
  private isScrollingTimeout = setTimeout(() => {
    //
  }, 0);

  @HostListener('scroll', ['$event']) public handleScroll = ():void => {
    window.clearTimeout( this.isScrollingTimeout );

    this.isScrollingTimeout = setTimeout(() => {
      this.setPosition()
    }, 66);
  }

  public constructor(private el: ElementRef<HTMLElement>) {}

  public ngAfterViewChecked(): void {
    this.youtubePlayerWidth = this.el.nativeElement.children[0]?.clientWidth + 8;
  }

  private setPosition(): void {
    const scrollLeftPosition = this.el.nativeElement.scrollLeft;
    const clipsScrolled = Math.round(scrollLeftPosition / this.youtubePlayerWidth)

    if (scrollLeftPosition + 16 > this.width + this.youtubePlayerWidth * (clipsScrolled-1)) {
      this.el.nativeElement.scrollTo({left: this.youtubePlayerWidth * clipsScrolled, behavior: 'smooth'})
      return
    }
  }
}

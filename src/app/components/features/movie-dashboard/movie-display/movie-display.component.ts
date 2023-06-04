import { Component, Input, inject } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';
import { IsTouchingDirective } from 'src/app/directives/is-touching.directive';

export interface IMovie {
  title: string
  poster: string
  release_date: string
}

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss'],
  animations: [fadeAnimation],
  hostDirectives: [IsTouchingDirective]
})
export class MovieDisplayComponent {
  @Input() public movie!: IMovie

  public constructor(
    private touchingDirective: IsTouchingDirective = inject(IsTouchingDirective, {self: true})
  ) {
    this.touchingDirective.appIsTouching.subscribe({
      next: () => this.toggleDisplay()
    })
  }

  public showDetails = false;

  public toggleDisplay(): void {
    this.showDetails = !this.showDetails
  }
}

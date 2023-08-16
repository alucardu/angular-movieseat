import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareSocialComponent } from 'src/app/components/shared/share-social/share-social.component';
import { IsTouchingDirective } from 'src/app/directives/is-touching/is-touching.directive';
import { MaterialModule } from 'src/app/material.module';

export interface IMovie {
  title: string
  poster: string
  release_date: string
}

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, ShareSocialComponent]
})
export class MovieDisplayComponent {
  @Input() public movie!: IMovie

  public showDetails = false;

  public constructor(
    private touchingDirective: IsTouchingDirective = inject(IsTouchingDirective, {self: true})
  ) {
    this.touchingDirective.isTouching$.subscribe({
      next: (isTouching) => this.toggleDisplay(isTouching)
    })
  }

  public toggleDisplay(isTouching: boolean): void {
    this.showDetails = (!this.showDetails && isTouching) ? true : false;
  }
}

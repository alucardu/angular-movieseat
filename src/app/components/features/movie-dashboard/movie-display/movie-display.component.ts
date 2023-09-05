import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeAnimation } from 'src/app/animations';
import { ShareSocialComponent } from 'src/app/components/shared/share-social/share-social.component';
import { IsTouchingDirective } from 'src/app/directives/is-touching/is-touching.directive';
import { MaterialModule } from 'src/app/material.module';
import { IMovie } from 'src/app/mock/watchlist.json';
import { StripTitle } from 'src/app/utils/string-utils';


@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss'],
  animations: [fadeAnimation],
  hostDirectives: [IsTouchingDirective],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, ShareSocialComponent]
})
export class MovieDisplayComponent {
  private touchingDirective: IsTouchingDirective = inject(IsTouchingDirective, {self: true})
  @Input() public movie!: IMovie
  public movieLink!: string

  public isTouching = this.touchingDirective.isTouching$

  public stripTitle(title: string): string {
    return StripTitle(title)
  }
}

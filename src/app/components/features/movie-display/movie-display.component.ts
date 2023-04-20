import { Component, Input } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';

interface IMovie {
  title: string
  poster: string
  release_date: string
}

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss'],
  animations: [fadeAnimation],
})
export class MovieDisplayComponent {
  @Input() public movie!: IMovie

  public showDetails = false;
  public touching = false;

  public hideDetails(): void {
    this.showDetails = false
  }

  public toggleDisplay(): void {
    this.showDetails = !this.showDetails
  }
}

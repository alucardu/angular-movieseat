import { Component } from '@angular/core';
import { watchlist } from 'src/app/mock/watchlist.json';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MovieDisplayComponent]
})
export class WatchlistComponent {
  public watchlist = watchlist
}

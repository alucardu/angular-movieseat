import { Component } from '@angular/core';
import { watchlist } from 'src/app/mock/watchlist.json';
import { CommonModule } from '@angular/common';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';

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

import { Component } from '@angular/core';
import { WatchlistComponent } from '../../watchlist/watchlist.component';

@Component({
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
  standalone: true,
  imports: [WatchlistComponent],
})
export class MovieDashboardComponent {
}

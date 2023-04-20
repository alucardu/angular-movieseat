import { Component } from '@angular/core';
import { watchlist } from 'src/app/mock/watchlist.json';

@Component({
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent {
  public watchlist = watchlist
}

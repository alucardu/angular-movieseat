import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { watchlist } from 'src/app/mock/watchlist.json';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MovieDisplayComponent]
})
export class WatchlistComponent implements OnInit {
  private metaTitleService = inject(Title)

  public watchlist = watchlist

  public ngOnInit(): void {
    this.metaTitleService.setTitle('Movieseat Watchlist')
  }
}

import { Component } from '@angular/core';
import { watchlist } from 'src/app/mock/watchlist.json';
import { MovieDisplayComponent } from '../movie-display/movie-display.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, MovieDisplayComponent]
})
export class MovieDashboardComponent {
  public watchlist = watchlist
}

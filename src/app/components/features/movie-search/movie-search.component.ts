import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { MovieSearchResultComponent } from './movie-search-result/movie-search-result.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class MovieSearchComponent {
  public constructor(public dialog: MatDialog) {}

  public movieSearchDialog(): void {
    this.dialog.open(MovieSearchDialogComponent, {
      height: '98vh',
      minWidth: '95vw',
    });
  }
}

@Component({
  templateUrl: 'movie-search-dialog/movie-search-dialog.html',
  styleUrls: ['movie-search-dialog/movie-search-dialog.scss'],
  standalone: true,
  imports: [MaterialModule, MovieSearchResultComponent]
})

export class MovieSearchDialogComponent {
}

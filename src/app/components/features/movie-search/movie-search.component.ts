import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { MovieSearchResultComponent } from './movie-search-result/movie-search-result.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class MovieSearchComponent {
  public constructor(
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  public movieSearchDialog(): void {
    this.ngZone.run(() => {
      this.dialog.open(MovieSearchDialogComponent, {
        height: '98vh',
        minWidth: '95vw',
      });
    })
  }
}

@Component({
  templateUrl: 'movie-search-dialog/movie-search-dialog.html',
  styleUrls: ['movie-search-dialog/movie-search-dialog.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, MovieSearchResultComponent]
})

export class MovieSearchDialogComponent {
}

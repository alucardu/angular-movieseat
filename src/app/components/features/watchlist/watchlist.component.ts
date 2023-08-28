import { Component, OnInit, inject } from '@angular/core';
import { watchlist } from 'src/app/mock/watchlist.json';
import { CommonModule } from '@angular/common';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MovieDisplayComponent]
})
export class WatchlistComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public watchlist = watchlist

  public ngOnInit(): void {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Angular SEO Integration, Music CRUD, Angular Universal',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);

    this.metaTitleService.setTitle('Movie title goes here')
  }
}

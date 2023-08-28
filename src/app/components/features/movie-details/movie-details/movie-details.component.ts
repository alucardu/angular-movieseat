import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: []
})
export class MovieDetailsComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

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

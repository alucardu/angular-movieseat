import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    console.log(1)
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'content dashboard page',
      },

    ]);

    this.metaTitleService.setTitle('Movie dashboard')
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    console.log('movie dashboard')
    this.metaTagService.updateTag({name: 'keywords', content: 'content dashboard page'},
    );

    this.metaTitleService.setTitle('Movie dashboard')
  }
}

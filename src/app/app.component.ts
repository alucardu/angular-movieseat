import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    this.metaTagService.addTag({name: 'keywords',content: 'content inital page'}),

    this.metaTitleService.setTitle('app component')
  }
}

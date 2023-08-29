import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { toggleContent } from 'src/app/animations';
import { Meta, Title } from '@angular/platform-browser';

export interface INotification {
  title: string,
  content: string,
  read: boolean,
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  animations: [toggleContent]
})
export class NotificationComponent implements OnInit {
  @Input() public notification!: INotification
  @Input() public index!: number;


  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'content notificaions page',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);

    this.metaTitleService.setTitle('notificaions')
  }
}

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
    this.metaTagService.updateTag({ name: 'keywords', content: 'content notifications page' });

    this.metaTitleService.setTitle('notifications')
  }
}

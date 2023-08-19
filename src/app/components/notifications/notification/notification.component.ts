import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from '../notification.service';
import { toggleSearchResult } from 'src/app/animations';

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
  animations: [toggleSearchResult]
})
export class NotificationComponent {
  @Input() public notification!: INotification
  @Input() public index!: number;

  private notificationService = inject(NotificationService)

  public notificationOpenedIndex$ = this.notificationService.notificationOpenedIndex$

  public toggleOpened(index: number): void {
    this.notificationService.setOpenedNotificationIndex(index)
    this.notificationService.markNotificationAsRead(index);
  }
}

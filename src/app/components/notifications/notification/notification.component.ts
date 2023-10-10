import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from '../notification.service';
import { toggleContent } from 'src/app/animations';
import { INotification } from 'src/app/mock/notifications.json';
import { StripTitle } from 'src/app/utils/string-utils';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  animations: [toggleContent]
})
export class NotificationComponent {
  private notificationService = inject(NotificationService)

  @Input() public notification!: INotification
  @Input() public index!: number;

  public notificationOpenedIndex$ = this.notificationService.notificationOpenedIndex$

  public toggleOpened(index: number, notification: INotification): void {
    this.notificationService.setOpenedNotificationIndex(index)
    if (!notification.read) this.notificationService.markNotificationAsRead(index, notification);
  }

  public stripTitle(title: string): string {
    return StripTitle(title)
  }

  public returnDaysAgo(notification: INotification): string {
    const createdAtDate = new Date(Number(notification.createdAt));
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hoursAgo = Math.floor(timeDifference / (1000 * 3600))
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    switch (true) {
      case minutesAgo < 60:
        return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
      case hoursAgo < 24:
        return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
      default:
        return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    }
  }

}

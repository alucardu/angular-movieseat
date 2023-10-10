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

  public toggleOpened(index: number): void {
    this.notificationService.setOpenedNotificationIndex(index)
    this.notificationService.markNotificationAsRead(index);
  }

  public stripTitle(title: string): string {
    return StripTitle(title)
  }
}

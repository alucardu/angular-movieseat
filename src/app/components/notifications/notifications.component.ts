import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, NotificationComponent],
})
export class NotificationsComponent {
  private notificationService = inject(NotificationService)

  public notifications$ = this.notificationService.notifications$

  public markAllNotificationsRead(): void {
    this.notificationService.markNotificationsAsRead()
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notifications-button',
  templateUrl: './notifications-button.component.html',
  styleUrls: ['./notifications-button.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class NotificationsButtonComponent {
  private notificationService = inject(NotificationService)

  public notificationAmount$ = this.notificationService.notificationAmount$
}

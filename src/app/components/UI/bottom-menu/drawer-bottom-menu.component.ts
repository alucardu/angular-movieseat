import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { NotificationsButtonComponent } from '../../notifications/notifications-button/notifications-button.component';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule, NotificationsButtonComponent],
})
export class DrawerBottomMenuComponent {}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterLink, CommonModule],
})
export class LogoutComponent {
  private authService = inject(AuthService)

  public logout(): void {
    this.authService.logoutUser();
  }
}

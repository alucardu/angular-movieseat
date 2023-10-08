import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink]
})
export class FriendsComponent {
  private authService = inject(AuthService)

  public currentUser$ = this.authService.currentUser$
}

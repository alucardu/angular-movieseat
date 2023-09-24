import { Component, inject } from '@angular/core';
import { ProfileMoviesComponent } from './profile-movies/profile-movies.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [SearchUserComponent, ProfileMoviesComponent, UserInfoComponent, NotificationSettingsComponent, MaterialModule, RouterLink]
})
export class ProfileComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  public logout(): void {
    this.authService.logoutUser().subscribe({
      next: () => this.router.navigate(['/']),
    })
  }
}

import { Component } from '@angular/core';
import { ProfileMoviesComponent } from './profile-movies/profile-movies.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [SearchUserComponent, ProfileMoviesComponent, UserInfoComponent]
})
export class ProfileComponent {}

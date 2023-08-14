import { Component } from '@angular/core';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [ProfileDisplayComponent]
})
export class ProfileComponent {}

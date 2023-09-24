import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule, LogoutComponent, LoginComponent, SignUpComponent],
})
export class AuthenticationComponent  {
  private authService = inject(AuthService)

  public constructor() {
    console.log(1)
  }

  public loggedIn$ = this.authService.userLoggedInStatus$;
}

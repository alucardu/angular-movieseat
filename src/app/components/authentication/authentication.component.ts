import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule]
})
export class AuthenticationComponent implements OnInit {
  private authService = inject(AuthService)

  public userLoggedInStatus$ = this.authService.userLoggedInStatus$;

  public state = 'login'

  public authForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  })

  public ngOnInit(): void {
    this.authService.userLoggedInStatus$.pipe(
      first()
    ).subscribe({
      next: (data) => {
        this.state = data ? 'logout' : 'login'
      }
    })
  }

  public login(): void {
    this.authService.loginUser();
  }

  public logout(): void {
    this.authService.logoutUser();
    this.state = 'login'
  }
}

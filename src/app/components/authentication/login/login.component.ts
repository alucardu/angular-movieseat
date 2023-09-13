import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterLink, CommonModule]
})
export class LoginComponent {
  private authService = inject(AuthService)

  public authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })


  public login(): void {
    this.authService.loginUser();
  }
}

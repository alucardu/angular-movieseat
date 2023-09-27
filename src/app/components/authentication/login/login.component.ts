import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { IResponse } from 'src/types/userTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterLink, CommonModule]
})
export class LoginComponent {
  private authService = inject(AuthService)
  private snackBarService = inject(SnackbBarService)
  private router = inject(Router)

  public authForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
  })

  public login(): void {
    if (this.authForm.valid) this.authService.authenticateByLogin(this.authForm).subscribe({
      next: ({data}) => {
        if (!data) return
        const { response: response, data: userData } = data.loginUser;
        this.authService.loginUser()
        this.router.navigate(['/watchlist'])
        this.snackBarService.openSnackBar(response, SnackBarState.SUCCESS, userData)
      },
      error: (data) => {
        const response: IResponse = {
          type: 'sign_in',
          code: data.message
        }
        this.snackBarService.openSnackBar(response, SnackBarState.ERROR)}
    })
  }

  public getErrorMessage(field: string): string {
    switch (field) {
      case 'email':
        if (this.authForm.controls.email.hasError('required')) {
          return 'You must enter a email address';
        }

        return this.authForm.controls.email.hasError('email') ? 'Not a valid email' : '';

      case 'password':
        if (this.authForm.controls.password.hasError('required')) {
          return 'You must enter a password';
        }

        if (this.authForm.controls.password.hasError('minlength')) {
          return 'Password must be at least 6 characters long';
        }

        if (this.authForm.controls.password.hasError('maxlength')) {
          return 'Password cannot exceed 24 characters';
        }

        return '';

      default:
        return ''
    }
  }
}

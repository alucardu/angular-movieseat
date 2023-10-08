import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { IResponse } from 'src/types/userTypes';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import { TogglePasswordDirective } from 'src/app/directives/toggle-password/toggle-password.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterLink, CommonModule, TogglePasswordDirective]
})
export class LoginComponent {
  private authService = inject(AuthService)
  private snackBarService = inject(SnackbBarService)
  private router = inject(Router)
  private cd = inject(ChangeDetectorRef)

  public authForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
  })

  public login(): void {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) this.authService.authenticateByLogin(this.authForm).subscribe({
      next: ({data}) => {
        if (!data) return
        const { response: response, data: userData } = data.loginUser;
        this.router.navigate(['/watchlist'])
        this.snackBarService.openSnackBar(response, SnackBarState.SUCCESS, userData)
        this.authService.loginUser(data.loginUser.data)
      },
      error: (data) => {
        const response: IResponse = {
          type: 'sign_in',
          code: data.message
        }
        this.snackBarService.openSnackBar(response, SnackBarState.ERROR)}
    })
  }

  public async signUp(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url: `${environment.baseUrl}/sign-up` });
    } else {
      this.router.navigate(['/sign-up'])
    }
  }

  public getErrorMessage(field: string): string {
    switch (field) {
      case 'username':
        if (this.authForm.controls.username.hasError('required')) {
          return 'You must enter a username';
        }

        if (this.authForm.controls.username.hasError('minlength')) {
          return 'Name must be at least 3 characters long';
        }

        if (this.authForm.controls.username.hasError('maxlength')) {
          return 'Name cannot exceed 18 characters';
        }
        return '';

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

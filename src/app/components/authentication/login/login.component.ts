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
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
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
}

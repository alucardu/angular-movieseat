import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SignUpService } from './sign-up.service';
import { SnackbBarService, SnackBarState } from 'src/app/services/snackbBar.service';
import { BehaviorSubject, first } from 'rxjs';
import { fadeAnimation } from 'src/app/animations';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IResponse } from 'src/types/userTypes';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

import * as EmailValidator from 'email-validator'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, ConfirmationComponent],
  animations: [fadeAnimation]
})
export class SignUpComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private signUpService = inject(SignUpService)
  private snackBarService = inject(SnackbBarService)
  private route = inject(ActivatedRoute)

  private signUpStateSubject$ = new BehaviorSubject<boolean>(true);
  public signUpState$ = this.signUpStateSubject$.asObservable();

  public signUpForm = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
  })

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe({
      next: (paramMap) => {
        if (paramMap.get('id')) this.signUpStateSubject$.next(false);
      }
    });

    this.signUpForm.controls.email.valueChanges.subscribe(() => {
      this.validateEmail();
    })

    this.signUpForm.controls.password.valueChanges.subscribe(() => {
      this.validatePasswordConfirmation();
    });

    this.signUpForm.controls.confirmPassword.valueChanges.subscribe(() => {
      this.validatePasswordConfirmation();
    });
  }

  private validateEmail(): void {
    const email = this.signUpForm.controls.email.value;
    if (email) {
      const valid = EmailValidator.validate(email)
      if (valid) {
        this.signUpForm.controls.email.setErrors(null)
      } else {
        this.signUpForm.controls.email.setErrors({ emailNotValid: true });
      }
    }
  }

  private validatePasswordConfirmation():void {
    const password = this.signUpForm.controls.password.value;
    const confirmPassword = this.signUpForm.controls.confirmPassword.value;

    if (password !== confirmPassword) {
      this.signUpForm.controls.confirmPassword.setErrors({ passwordsNotMatch: true });
    } else {
      this.signUpForm.controls.confirmPassword.setErrors(null);
    }
  }

  public async submitSignUpForm(): Promise<void> {
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.invalid) return
    this.signUpService.createUser(this.signUpForm).subscribe({
      next: async ({data}) => {
        if (!data) return
        this.signUpStateSubject$.next(false)
        this.snackBarService.openSnackBar(data.createUser.response, SnackBarState.SUCCESS)
      },
      error: (data) => {
        const response: IResponse = {
          type: 'sign_up',
          code: data.message
        }
        this.snackBarService.openSnackBar(response, SnackBarState.ERROR)}
    })
  }

  public getErrorMessage(field: string): string {
    switch (field) {
      case 'email':
        if (this.signUpForm.controls.email.hasError('required')) {
          return 'You must enter a email address';
        }
        if (this.signUpForm.controls.email.hasError('emailNotValid')) {
          return 'Email address is not valid';
        }

        return this.signUpForm.controls.email.hasError('email') ? 'Not a valid email' : '';

      case 'username':
        if (this.signUpForm.controls.username.hasError('required')) {
          return 'You must enter a username';
        }

        if (this.signUpForm.controls.username.hasError('minlength')) {
          return 'Name must be at least 3 characters long';
        }

        if (this.signUpForm.controls.username.hasError('maxlength')) {
          return 'Name cannot exceed 18 characters';
        }
        return '';

      case 'password':
        if (this.signUpForm.controls.password.hasError('required')) {
          return 'You must enter a password';
        }

        if (this.signUpForm.controls.password.hasError('minlength')) {
          return 'Password must be at least 6 characters long';
        }

        if (this.signUpForm.controls.password.hasError('maxlength')) {
          return 'Password cannot exceed 24 characters';
        }
        return '';

      case 'confirmPassword':
        if (this.signUpForm.controls.confirmPassword.hasError('required')) {
          return 'You must confirm your password';
        }

        if (!this.signUpForm.controls.password.hasError('passwordsNotMatch')) {
          return 'The passwords do not match';
        }

        return '';

      default:
        return '';
    }
  }
}

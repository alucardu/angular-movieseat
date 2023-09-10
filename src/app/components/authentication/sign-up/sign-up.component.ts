import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class SignUpComponent implements OnInit {
  private formBuilder = inject(FormBuilder)

  public signUpForm = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  })

  public ngOnInit(): void {
    this.signUpForm.controls.confirmPassword.valueChanges.subscribe(() => {
      this.validatePasswordConfirmation();
    });
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

  public submit(): void {
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.invalid) return
    console.log('send')
  }

  public getErrorMessage(field: string): string {
    switch (field) {
      case 'email':
        if (this.signUpForm.controls.email.hasError('required')) {
          return 'You must enter a email address';
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

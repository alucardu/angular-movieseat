import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SignUpService } from './sign-up.service';
import { SnackbBarService, SnackBarState } from 'src/app/services/snackbBar.service';
import { BehaviorSubject, first } from 'rxjs';
import { fadeAnimation } from 'src/app/animations';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IResponse } from 'src/types/userTypes';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  animations: [fadeAnimation]
})
export class SignUpComponent implements OnInit, AfterViewInit {
  private renderer2 = inject(Renderer2)
  private formBuilder = inject(FormBuilder)
  private signUpService = inject(SignUpService)
  private snackBarService = inject(SnackbBarService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  @ViewChild('digit2') private digit2?: ElementRef<HTMLInputElement>
  @ViewChild('digit3') private digit3?: ElementRef<HTMLInputElement>
  @ViewChild('digit4') private digit4?: ElementRef<HTMLInputElement>

  private signUpStateSubject$ = new BehaviorSubject<boolean>(true);
  public signUpState$ = this.signUpStateSubject$.asObservable();

  private confirmationCode?: string | null

  public signUpForm = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  })

  public confirmationCodeForm = this.formBuilder.group({
    userId: new FormControl<string|null>(null, [Validators.required]),
    digit1: new FormControl<string|null>(null, [Validators.required]),
    digit2: new FormControl<string|null>(null, [Validators.required]),
    digit3: new FormControl<string|null>(null, [Validators.required]),
    digit4: new FormControl<string|null>(null, [Validators.required]),
  });

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe({
      next: (paramMap) => {
        this.confirmationCodeForm.controls.userId.setValue(paramMap.get('id'))
        this.confirmationCode = paramMap.get('confirmationCode')
        if(this.confirmationCode) {
          this.signUpStateSubject$.next(false)
          this.confirmationCodeForm.controls.digit1.setValue(this.confirmationCode.charAt(0))
          this.confirmationCodeForm.controls.digit2.setValue(this.confirmationCode.charAt(1))
          this.confirmationCodeForm.controls.digit3.setValue(this.confirmationCode.charAt(2))
          this.confirmationCodeForm.controls.digit4.setValue(this.confirmationCode.charAt(3))
        }
      }
    })

    this.signUpForm.controls.password.valueChanges.subscribe(() => {
      this.validatePasswordConfirmation();
    });

    this.signUpForm.controls.confirmPassword.valueChanges.subscribe(() => {
      this.validatePasswordConfirmation();
    });
  }

  public ngAfterViewInit(): void {
    this.confirmationCodeForm.controls.digit1.valueChanges.subscribe(() => {this.renderer2.selectRootElement(this.digit2?.nativeElement).focus()})
    this.confirmationCodeForm.controls.digit2.valueChanges.subscribe(() => {this.renderer2.selectRootElement(this.digit3?.nativeElement).focus()})
    this.confirmationCodeForm.controls.digit3.valueChanges.subscribe(() => {this.renderer2.selectRootElement(this.digit4?.nativeElement).focus()})
    this.confirmationCodeForm.controls.digit4.valueChanges.subscribe(() => this.submitConfirmationCode())
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

  public submitSignUpForm(): void {
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.invalid) return
    this.signUpService.createUser(this.signUpForm).subscribe({
      next: ({data}) => {
        if (!data) return
        this.signUpStateSubject$.next(false)
        this.router.navigate(['/sign-up'], { queryParams: {id: data.createUser.data.id, confirmationCode: 'xxxx'}});
        this.confirmationCodeForm.controls.userId.setValue(data.createUser.data.id)
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

  public submitConfirmationCode(): void {
    this.confirmationCodeForm.markAllAsTouched();

    setTimeout(() => {
      if (this.confirmationCodeForm.valid) {
        this.signUpService.confirmUser(this.confirmationCodeForm).subscribe({
          next: ({data}) => {
            if (!data) return
            this.snackBarService.openSnackBar(data.confirmUser.response, SnackBarState.SUCCESS)
            this.router.navigate(['/login'])
          },
          error: (data) => {
            const response: IResponse = {
              type: 'sign_up',
              code: data.message
            }
            this.snackBarService.openSnackBar(response, SnackBarState.ERROR)}
        })
      }
    })
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

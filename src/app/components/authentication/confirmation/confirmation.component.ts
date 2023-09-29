import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SignUpService } from '../sign-up/sign-up.service';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponse } from 'src/types/userTypes';
import { first } from 'rxjs/internal/operators/first';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class ConfirmationComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder)
  private signUpService = inject(SignUpService)
  private snackBarService = inject(SnackbBarService)
  private router = inject(Router)
  private renderer2 = inject(Renderer2)
  private route = inject(ActivatedRoute)

  @ViewChild('digit1') private digit1?: ElementRef<HTMLInputElement>
  @ViewChild('digit2') private digit2?: ElementRef<HTMLInputElement>
  @ViewChild('digit3') private digit3?: ElementRef<HTMLInputElement>
  @ViewChild('digit4') private digit4?: ElementRef<HTMLInputElement>

  private digits!: Array<ElementRef<HTMLInputElement> | undefined>

  private signUpStateSubject$ = new BehaviorSubject<boolean>(true);
  public signUpState$ = this.signUpStateSubject$.asObservable();

  private confirmationCode?: string | null

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
  }

  public ngAfterViewInit(): void {
    this.digits = [this.digit1, this.digit2, this.digit3, this.digit4]

    this.clearInputOnFocus();
    this.focusNextInput();
  }

  public submitConfirmationCode(): void {
    this.confirmationCodeForm.markAllAsTouched();

    setTimeout(() => {
      if (this.confirmationCodeForm.valid) {
        this.signUpService.confirmUser(this.confirmationCodeForm).subscribe({
          next: ({data}) => {
            if (!data) return
            this.snackBarService.openSnackBar(data.confirmUser.response, SnackBarState.SUCCESS, data.confirmUser.data)
            this.router.navigate(['/watchlist'])
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

  private clearInputOnFocus(): void {
    this.digits.forEach((input, index) => {
      input?.nativeElement.addEventListener('focus', () => {
        this.confirmationCodeForm.controls[`digit${index + 1}` as 'digit1'|'digit2'|'digit3'|'digit4'].setValue('');
      });
    });
  }

  private focusNextInput(): void {
    this.confirmationCodeForm.valueChanges.subscribe({
      next: () => {
        let index = 0;

        for (const field in this.confirmationCodeForm.controls) {
          const control = this.confirmationCodeForm.get(field);
          if (control?.status === 'INVALID') {
            control.valueChanges.pipe(first()).subscribe({
              next: (value) => {
                if (!value) return;
                const uppercasedValue = value.toUpperCase();
                if (value !== uppercasedValue) control.setValue(uppercasedValue)

                if(index === 4) {
                  this.submitConfirmationCode()
                  return;
                }

                this.renderer2.selectRootElement(this.digits[index]?.nativeElement).focus()
              }
            })
            return
          } else {
            index++
          }
        }
      }
    })

  }
}

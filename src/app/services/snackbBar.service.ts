import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/UI/snackBar/snackBar.component';
import { IResponse } from 'src/types/userTypes';
import { IUser } from '../components/authentication/sign-up/sign-up.service';
import { IMovie } from '../mock/watchlist.json';

export enum SnackBarState {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface SnackBarData {
  message: string,
  state: SnackBarState
}

@Injectable({
  providedIn: 'root'
})
export class SnackbBarService {
  private _snackBar = inject(MatSnackBar)

  public openSnackBar(response: IResponse, state: SnackBarState, data?: IUser | IMovie): void {
    const message = this.setMessageText(response, data);

    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: state,
      duration: 3500,
      data: {
        message: message,
        state: state
      } as SnackBarData
    })
  }

  private setMessageText(response: IResponse, data?: IUser | IMovie): string {
    switch (response.type) {

      case 'user':
        data = <IUser>data
        switch (response.code) {
          case 'U_01':
            return 'Your account has been created! Check your email!'

          case 'U_02':
            return 'Your account has been confirmed!'

          case 'U_03':
            return `Welcome back ${data?.username}`

          case 'U_04':
            return 'Incorrect email and or password.'

          case 'U_05':
            return 'Your account has not yet been confirmed. Check your email!'

          default:
            return '';
        }

      case 'sign_in':
        switch (response.code) {
          case 'P2025':
            return 'Email not found'

          default:
            return ''
        }

      case 'sign_up':
        switch (response.code) {
          case 'P2002':
            return 'Username or email already in use'

          case 'P2025':
            return 'Incorrect confirmation code'

          default:
            return '';
        }

      default:
          return '';
    }
  }
}

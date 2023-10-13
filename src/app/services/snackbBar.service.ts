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
      duration: 1500,
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
            return `Your account has been confirmed! Welcome ${data?.username}.`

          case 'U_03':
            return `Welcome back ${data?.username}.`

          case 'U_05':
            return 'Your account has not yet been confirmed. Check your email!'

          case 'U_13':
            return `Added ${data?.username} to your friends!`

          case 'U_14':
            return `Removed ${data?.username} from your friends!`

          default:
            return '';
        }

      case 'movie':
        data = <IMovie>data
        switch (response.code) {
          case 'U_08':
            return `${data.title} has been added to your watchlist.`

          case 'U_09':
            return `${data.title} has been removed from your watchlist.`

          case 'U_10':
            return `You have already added this movie to your watchlist.`

          default:
            return '';
        }

      case 'sign_in':
        switch (response.code) {
          case 'U_04':
            return 'Incorrect username and or password.'

          case 'U_05':
            return 'Your account has not yet been confirmed. Check your email!'

          case 'U_06':
            return 'Cookiemonster ate your cookie!'

          case 'P2025':
            return 'Username not found.'

          case 'P1003':
            return 'Database is offline.'

          default:
            return ''
        }

      case 'sign_up':
        switch (response.code) {
          case 'P2002':
            return 'Username or email already in use.'

          case 'P2025':
            return 'Incorrect confirmation code.'

          default:
            return '';
        }

      default:
          return '';
    }
  }
}

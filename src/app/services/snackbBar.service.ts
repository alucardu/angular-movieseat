import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/UI/snackBar/snackBar.component';

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

  public openSnackBar(message: string, state: SnackBarState): void {
    message = this.setMessageText(message);

    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: state,
      duration: 3500,
      data: {
        message: message,
        state: state
      } as SnackBarData
    })
  }

  private setMessageText(message: string): string {
    switch (message) {
      case 'U_01':
        message = 'Your account has been created! Check your email!'
        break;

      case 'U_02':
        message = 'Your account has been confirmed!'
        break;

      case 'P2002':
        message = 'Username or email is already taken.'
        break;

      case 'P2025':
        message = 'Something went wrong.'
        break;
    }

    return message
  }
}

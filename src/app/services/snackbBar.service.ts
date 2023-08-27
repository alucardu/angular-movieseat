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
}

@Injectable({
  providedIn: 'root'
})
export class SnackbBarService {
  private _snackBar = inject(MatSnackBar)

  public openSnackBar(message: string, state: string): void {
    this._snackBar.openFromComponent(SnackBarComponent, {
      panelClass: state,
      duration: 1500,
      data: {
        message: message
      } as SnackBarData
    })
  }
}
